// src/hooks/useFetchPatients.js
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPatients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("http://172.18.1.41:4000/", {
        query: `
        query ExampleQuery {
          patients {
            id
            personalInformation {
              cid
              birthDate
              firstName
              lastName
              middleName
              passportId
              prefixName
              sex
              sensitiveInformation {
                occupation
              }
            }
            medicalRecords {
              hn
            }
          }
        }
      `,
      })
      .then((response) => {
        const patients = response.data.data.patients.map((patient) => ({
          id: patient.id,
          cid: patient.personalInformation.cid,
          hn: patient.medicalRecords[0].hn,
          birthDate: patient.personalInformation.birthDate,
          firstName: patient.personalInformation.firstName,
          lastName: patient.personalInformation.lastName,
          middleName: patient.personalInformation.middleName,
          passportId: patient.personalInformation.passportId,
          prefixName: patient.personalInformation.prefixName,
          sex: patient.personalInformation.sex,
          occupation:
            patient.personalInformation.sensitiveInformation.occupation,
        }));
        setData(patients);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};

export default useFetchPatients;
