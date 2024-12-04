# Importing Libraries
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn import tree
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import warnings

warnings.filterwarnings("ignore")

# List of symptoms
l1=['back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
    'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
    'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
    'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
    'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
    'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
    'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
    'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
    'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
    'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
    'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
    'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
    'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
    'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria','family_history','mucoid_sputum',
    'rusty_sputum','lack_of_concentration','visual_disturbances','receiving_blood_transfusion',
    'receiving_unsterile_injections','coma','stomach_bleeding','distention_of_abdomen',
    'history_of_alcohol_consumption','fluid_overload','blood_in_sputum','prominent_veins_on_calf',
    'palpitations','painful_walking','pus_filled_pimples','blackheads','scurring','skin_peeling',
    'silver_like_dusting','small_dents_in_nails','inflammatory_nails','blister','red_sore_around_nose',
    'yellow_crust_ooze']

# List of diseases
disease=['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis',
       'Drug Reaction', 'Peptic ulcer diseae', 'AIDS', 'Diabetes ',
       'Gastroenteritis', 'Bronchial Asthma', 'Hypertension ', 'Migraine',
       'Cervical spondylosis', 'Paralysis (brain hemorrhage)', 'Jaundice',
       'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A',
       'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E',
       'Alcoholic hepatitis', 'Tuberculosis', 'Common Cold', 'Pneumonia',
       'Dimorphic hemmorhoids(piles)', 'Heart attack', 'Varicose veins',
       'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia',
       'Osteoarthristis', 'Arthritis',
       '(vertigo) Paroymsal  Positional Vertigo', 'Acne',
       'Urinary tract infection', 'Psoriasis', 'Impetigo']

# Initialize symptoms list
l2 = [0] * len(l1)

# Reading the training .csv file
df = pd.read_csv("training.csv")

# Replace disease names with numerical values
disease_mapping = {d: i for i, d in enumerate(disease)}
df.replace({'prognosis': disease_mapping}, inplace=True)

# Verify the replacement
print(df['prognosis'].unique())  # This should print integer values

# Split data into features and labels
X = df[l1]
y = df["prognosis"]
y = y.astype(int)  # Ensure y is of integer type

# Reading the testing .csv file
tr = pd.read_csv("testing.csv")

# Replace disease names with numerical values
tr.replace({'prognosis': disease_mapping}, inplace=True)

# Split testing data into features and labels
X_test = tr[l1]
y_test = tr["prognosis"]
y_test = y_test.astype(int)  # Ensure y_test is of integer type

#############################################################################################################

# # Decision tree classifier
# clf = tree.DecisionTreeClassifier()
# clf = clf.fit(X, y)

# # Predict on test data
# y_pred = clf.predict(X_test)

# # Print results
# print("Decision Tree")
# print("Accuracy:", accuracy_score(y_test, y_pred))
# print("Accuracy (Count):", accuracy_score(y_test, y_pred, normalize=False))
# print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

# # Predict a single instance
# psymptoms = ['back_pain', 'constipation', 'abdominal_pain', 'swelling_of_stomach' , 'blister']

# for symptom in psymptoms:
#     if symptom in l1:
#         l2[l1.index(symptom)] = 1

# inputtest = [l2]
# predict = clf.predict(inputtest)
# predicted = predict[0]

# print("Predicted Disease:", disease[predicted])



################################################################################################################


# Import necessary libraries
from sklearn import tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, confusion_matrix

# Train and evaluate Decision Tree Classifier
clf_dt = tree.DecisionTreeClassifier()
clf_dt = clf_dt.fit(X, y)
y_pred_dt = clf_dt.predict(X_test)

print("Decision Tree")
print("Accuracy:", accuracy_score(y_test, y_pred_dt))
print("Accuracy (Count):", accuracy_score(y_test, y_pred_dt, normalize=False))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred_dt))

# Train and evaluate Random Forest Classifier
clf_rf = RandomForestClassifier()
clf_rf = clf_rf.fit(X, y)
y_pred_rf = clf_rf.predict(X_test)

print("Random Forest")
print("Accuracy:", accuracy_score(y_test, y_pred_rf))
print("Accuracy (Count):", accuracy_score(y_test, y_pred_rf, normalize=False))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred_rf))

# Train and evaluate K-Nearest Neighbors Classifier
clf_knn = KNeighborsClassifier()
clf_knn = clf_knn.fit(X, y)
y_pred_knn = clf_knn.predict(X_test)

print("K-Nearest Neighbors")
print("Accuracy:", accuracy_score(y_test, y_pred_knn))
print("Accuracy (Count):", accuracy_score(y_test, y_pred_knn, normalize=False))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred_knn))

# Train and evaluate Support Vector Classifier
clf_svc = SVC()
clf_svc = clf_svc.fit(X, y)
y_pred_svc = clf_svc.predict(X_test)

print("Support Vector Classifier")
print("Accuracy:", accuracy_score(y_test, y_pred_svc))
print("Accuracy (Count):", accuracy_score(y_test, y_pred_svc, normalize=False))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred_svc))

# Train and evaluate Naive Bayes Classifier
clf_nb = GaussianNB()
clf_nb = clf_nb.fit(X, y)
y_pred_nb = clf_nb.predict(X_test)

print("Naive Bayes")
print("Accuracy:", accuracy_score(y_test, y_pred_nb))
print("Accuracy (Count):", accuracy_score(y_test, y_pred_nb, normalize=False))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred_nb))

# Predict a single instance using each classifier
psymptoms = ['continuous_feel_of_urine','internal_itching', 'swelling_of_stomach', 'blister']
l2 = [0] * len(l1)

for symptom in psymptoms:
    if symptom in l1:
        l2[l1.index(symptom)] = 1

inputtest = [l2]

# Prediction with Decision Tree
predict_dt = clf_dt.predict(inputtest)
predicted_dt = predict_dt[0]
print("Decision Tree Predicted Disease:", disease[predicted_dt])

# Prediction with Random Forest
predict_rf = clf_rf.predict(inputtest)
predicted_rf = predict_rf[0]
print("Random Forest Predicted Disease:", disease[predicted_rf])

# Prediction with K-Nearest Neighbors
predict_knn = clf_knn.predict(inputtest)
predicted_knn = predict_knn[0]
print("K-Nearest Neighbors Predicted Disease:", disease[predicted_knn])

# Prediction with Support Vector Classifier
predict_svc = clf_svc.predict(inputtest)
predicted_svc = predict_svc[0]
print("Support Vector Classifier Predicted Disease:", disease[predicted_svc])

# Prediction with Naive Bayes
predict_nb = clf_nb.predict(inputtest)
predicted_nb = predict_nb[0]
print("Naive Bayes Predicted Disease:", disease[predicted_nb])


# Majority vote
from scipy.stats import mode

predictions = [predict_dt[0], predict_rf[0], predict_knn[0], predict_svc[0], predict_nb[0]]
majority_vote = mode(predictions).mode[0]

print("Majority Vote Predicted Disease:", disease[majority_vote])


##############################3 accuracy ######################################33

# Calculate accuracy for each classifier
acc_dt = accuracy_score(y_test, y_pred_dt)
acc_rf = accuracy_score(y_test, y_pred_rf)
acc_knn = accuracy_score(y_test, y_pred_knn)
acc_svc = accuracy_score(y_test, y_pred_svc)
acc_nb = accuracy_score(y_test, y_pred_nb)

# Print accuracy percentages for each classifier
print(f"Decision Tree Accuracy: {acc_dt * 100:.2f}%")
print(f"Random Forest Accuracy: {acc_rf * 100:.2f}%")
print(f"K-Nearest Neighbors Accuracy: {acc_knn * 100:.2f}%")
print(f"Support Vector Classifier Accuracy: {acc_svc * 100:.2f}%")
print(f"Naive Bayes Accuracy: {acc_nb * 100:.2f}%")


# Calculate average accuracy
average_accuracy = (acc_dt + acc_rf + acc_knn + acc_svc + acc_nb) / 5
average_accuracy_percentage = average_accuracy * 100
print(f"Average Accuracy: {average_accuracy_percentage:.2f}%")

