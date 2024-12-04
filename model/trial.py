import pandas as pd
import pickle

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

# List of symptoms (assuming you have it)
symptoms = ['small_dents_in_nails', 'blood_in_sputum', 'stomach_bleeding', 'belly_pain', 'abnormal_menstruation']

# Load trained models from pickle file
with open('trained_models.pkl', 'rb') as f:
    classifiers = pickle.load(f)

# Prepare input for prediction
input_symptoms = pd.DataFrame([[1 if symptom in symptoms else 0 for symptom in l1]], columns=l1)

# Make predictions using each classifier
results = {}
for name, clf in classifiers.items():
    prediction = clf.predict(input_symptoms)
    results[name] = {
        'predicted_disease': disease[prediction[0]],
        'accuracy': None  # To calculate accuracy, you need actual test data
    }

# Perform majority vote prediction if needed
# Example:
all_predictions = [results[name]['predicted_disease'] for name in classifiers.keys()]
# majority_vote_prediction = mode(all_predictions).mode[0]
predictions_df = pd.DataFrame(all_predictions)
majority_vote_prediction = predictions_df.mode().iloc[0, 0]




# Print or use results as needed
print("Predictions using saved models:")
for name, result in results.items():
    print(f"{name}: Predicted Disease - {result['predicted_disease']}")


###################################################################################
print('\n')
print("majority disease prediction :: " , majority_vote_prediction)
print()