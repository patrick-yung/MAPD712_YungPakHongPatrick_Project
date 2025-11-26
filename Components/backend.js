
const API_URL = 'http://localhost:3000';

const fetchPatients = async () => {
        try {
            const response = await fetch(`${API_URL}/patients`);
            const result = await response.json();

            if (response.ok || result.success) {
                setPatientTable(result || []);
                console.log('Patients fetched successfully:', result);
            } else {
                console.error('Failed to fetch patients:', result.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


const addPatient = async (patient) => {
    if (!patient.name || !patient.age || !patient.deparment) {
        console.error('Patient must have a name, age and department');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/patients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patient),
        });
        const newPatient = await response.json();
        setOldPatient(patient.name, patient.age, patient.deparment);
        navigation.navigate('viewPatients');

        console.log('Patient added:', newPatient);
    } catch (error) {
        console.error('Error adding patient:', error);
    }
}

const deletePatient = async(patient) => {

    if(!patient.name){
        console.error('Patient Name is not provided')
        return;
    }
    try {
        const response = await fetch(`${API_URL}/patients`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patient),
        });
        navigation.navigate('viewPatients');


    } catch(error){
        console.error('Error delete patient:', error);
    }


}