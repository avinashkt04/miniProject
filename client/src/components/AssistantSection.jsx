import { useState, useRef, useEffect } from "react";
import {
  Badge,
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { currentUserAPI } from "@/store/services/userAction";

const Symptoms = [
  {
    value: "back_pain",
    label: "Back Pain",
  },
  {
    value: "constipation",
    label: "Constipation",
  },
  {
    value: "abdominal_pain",
    label: "Abdominal Pain",
  },
  {
    value: "diarrhoea",
    label: "Diarrhoea",
  },
  {
    value: "mild_fever",
    label: "Mild Fever",
  },
  {
    value: "yellow_urine",
    label: "Yellow Urine",
  },
  {
    value: "yellowing_of_eyes",
    label: "Yellowing of Eyes",
  },
  {
    value: "acute_liver_failure",
    label: "Acute Liver Failure",
  },
  {
    value: "fluid_overload",
    label: "Fluid Overload",
  },
  {
    value: "swelling_of_stomach",
    label: "Swelling of Stomach",
  },
  {
    value: "swelled_lymph_nodes",
    label: "Swelled Lymph Nodes",
  },
  {
    value: "malaise",
    label: "Malaise",
  },
  {
    value: "blurred_and_distorted_vision",
    label: "Blurred and Distorted Vision",
  },
  {
    value: "phlegm",
    label: "Phlegm",
  },
  {
    value: "throat_irritation",
    label: "Throat Irritation",
  },
  {
    value: "redness_of_eyes",
    label: "Redness of Eyes",
  },
  {
    value: "sinus_pressure",
    label: "Sinus Pressure",
  },
  {
    value: "runny_nose",
    label: "Runny Nose",
  },
  {
    value: "congestion",
    label: "Congestion",
  },
  {
    value: "chest_pain",
    label: "Chest Pain",
  },
  {
    value: "weakness_in_limbs",
    label: "Weakness in Limbs",
  },
  {
    value: "fast_heart_rate",
    label: "Fast Heart Rate",
  },
  {
    value: "pain_during_bowel_movements",
    label: "Pain During Bowel Movements",
  },
  {
    value: "pain_in_anal_region",
    label: "Pain in Anal Region",
  },
  {
    value: "bloody_stool",
    label: "Bloody Stool",
  },
  {
    value: "irritation_in_anus",
    label: "Irritation in Anus",
  },
  {
    value: "neck_pain",
    label: "Neck Pain",
  },
  {
    value: "dizziness",
    label: "Dizziness",
  },
  {
    value: "cramps",
    label: "Cramps",
  },
  {
    value: "bruising",
    label: "Bruising",
  },
  {
    value: "obesity",
    label: "Obesity",
  },
  {
    value: "swollen_legs",
    label: "Swollen Legs",
  },
  {
    value: "swollen_blood_vessels",
    label: "Swollen Blood Vessels",
  },
  {
    value: "puffy_face_and_eyes",
    label: "Puffy Face and Eyes",
  },
  {
    value: "enlarged_thyroid",
    label: "Enlarged Thyroid",
  },
  {
    value: "brittle_nails",
    label: "Brittle Nails",
  },
  {
    value: "swollen_extremeties",
    label: "Swollen Extremities",
  },
  {
    value: "excessive_hunger",
    label: "Excessive Hunger",
  },
  {
    value: "extra_marital_contacts",
    label: "Extra Marital Contacts",
  },
  {
    value: "drying_and_tingling_lips",
    label: "Drying and Tingling Lips",
  },
];

function AssistantSection() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  const handleSelect = (value) => {
    const symptom = Symptoms.find((s) => s.value === value);
    if (symptom && !selected.includes(symptom.value) && selected.length < 6) {
      setSelected((prev) => [...prev, symptom.value]);
    } else if (symptom && selected.length > 5) {
      toast.error("Maximum 6 symptoms can be selected at once");
    }
  };

  const handleUnselect = (symptom) => {
    setSelected((prev) => prev.filter((s) => s !== symptom));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected.length < 3) {
      toast.error("Select atleast 3 symptoms");
      return;
    }
    const body = JSON.stringify(selected);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        symptoms: body,
      });
      setPrediction(response.data.majority_vote_prediction);

      const queryResponse = await axios.post(
        "http://localhost:8000/api/v1/add-Query",
        { symptoms: body, prediction: response.data.majority_vote_prediction },
        { withCredentials: true }
      );

      setSuccess(true);
    } catch (error) {
      console.error("Error making prediction", error);
    }
  };

  useEffect(() => {
    if (prediction && success) {
      dispatch(currentUserAPI());
      setSuccess(false);
    }
  }, [success, dispatch]);

  return (
    <div className="p-2 w-[20rem]  mx-auto top-7">
      <form onSubmit={handleSubmit} className="border p-4 rounded-lg">
        <div className="mb-4">
          <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select symptoms" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Symptoms</SelectLabel>
                {Symptoms.map((symptom) => (
                  <SelectItem key={symptom.value} value={symptom.value}>
                    {symptom.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" variant="secondary" className="w-full">
          Submit
        </Button>
        <div className="flex flex-wrap gap-1 mt-4">
          {selected.map((symptom) => (
            <Badge key={symptom} className="flex items-center text-sm">
              {symptom}
              <button
                type="button"
                onClick={() => handleUnselect(symptom)}
                className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
        </div>
      </form>
      {prediction && (
        <>
          <h2 className="mt-4 scroll-m-20 pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0">
            Diagnosis Result:
          </h2>
          <Textarea
            className="text-2xl font-bold"
            placeholder="Type your message here."
            value={prediction}
            disabled
          />
        </>
      )}
    </div>
  );
}

export default AssistantSection;
