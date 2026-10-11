
from pathlib import Path
import json
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline, FeatureUnion
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

BASE = Path(__file__).resolve().parent
DATA = BASE / "data" / "complaints_text_cleaned.csv"
MODEL_DIR = BASE / "models"
MODEL_DIR.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(DATA)
df = df[["complaint_text", "category"]].dropna().copy()
df["complaint_text"] = df["complaint_text"].astype(str).str.strip()
df["category"] = df["category"].astype(str).str.strip()
df = df[df["complaint_text"] != ""]

# Normalize text and remove duplicate complaints.
df["_normalized"] = (
    df["complaint_text"].str.lower()
    .str.replace(r"\s+", " ", regex=True).str.strip()
)

conflicts = df.groupby("_normalized")["category"].nunique()
conflicts = conflicts[conflicts > 1]
if len(conflicts):
    raise ValueError(
        f"{len(conflicts)} identical texts have conflicting labels."
    )

df = df.drop_duplicates("_normalized").reset_index(drop=True)
print("Unique complaints:", len(df))
print("Category counts:\n", df["category"].value_counts())

# Ensure every category can appear in both sets.
counts = df["category"].value_counts()
if len(counts) < 2 or counts.min() < 2:
    raise ValueError("Not enough examples per category for stratified evaluation.")

X_train, X_test, y_train, y_test = train_test_split(
    df["complaint_text"],
    df["category"],
    test_size=0.20,
    random_state=42,
    stratify=df["category"],
)

model = Pipeline([
    ("features", FeatureUnion([
        ("word", TfidfVectorizer(
            analyzer="word", ngram_range=(1, 2), min_df=1
        )),
        ("char", TfidfVectorizer(
            analyzer="char_wb", ngram_range=(2, 5), min_df=1,
            max_features=30000
        )),
    ])),
    ("classifier", LogisticRegression(
        max_iter=1500, class_weight="balanced"
    )),
])

model.fit(X_train, y_train)
pred = model.predict(X_test)
accuracy = accuracy_score(y_test, pred)

print(f"\nTrain rows: {len(X_train)}")
print(f"Test rows: {len(X_test)}")
print(f"Accuracy: {accuracy:.4f}")
print(classification_report(y_test, pred, zero_division=0))

joblib.dump(model, MODEL_DIR / "civicpulse_text_model.joblib")
metrics = {
    "accuracy": float(accuracy),
    "train_rows": int(len(X_train)),
    "test_rows": int(len(X_test)),
    "unique_complaints": int(len(df)),
    "categories": sorted(df["category"].unique().tolist()),
}
(MODEL_DIR / "evaluation_metrics.json").write_text(
    json.dumps(metrics, indent=2), encoding="utf-8"
)
print("Saved model and evaluation metrics.")
