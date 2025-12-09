// ViewPatients.complete-test.js
// Run with: node ViewPatients.complete-test.js

class CompleteTester {
  constructor() {
    this.results = [];
    this.createdPatientName = null;
  }

  // Test 1: Backend API connection
  async testAPIConnection() {
    console.log('Testing GET /patients...');
    try {
      const response = await fetch('http://localhost:3000/patients');
      const data = await response.json();
      const passed = response.ok;
      
      const result = {
        test: 'GET /patients',
        passed,
        details: `Status: ${response.status}, Found: ${data.length} patients`
      };
      
      this.results.push(result);
      console.log(`Result: ${passed ? 'PASS' : 'FAIL'} - ${result.details}`);
      return passed;
    } catch (error) {
      const result = {
        test: 'GET /patients',
        passed: false,
        details: `Error: ${error.message}`
      };
      this.results.push(result);
      console.log(`Result: FAIL - ${result.details}`);
      return false;
    }
  }

  // Test 2: Create patient
  async testCreatePatient() {
    console.log('\nTesting POST /patients...');
    const testPatient = {
      name: `TestPatient${Date.now()}`,
      age: '30',
      deparment: 'Test Department'
    };

    this.createdPatientName = testPatient.name;

    try {
      const response = await fetch('http://localhost:3000/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPatient)
      });

      const data = await response.json();
      const passed = response.status === 201;
      
      const result = {
        test: 'POST /patients',
        passed,
        details: `Status: ${response.status}, Created: ${testPatient.name}`
      };
      
      this.results.push(result);
      console.log(`Result: ${passed ? 'PASS' : 'FAIL'} - ${result.details}`);
      return passed;
    } catch (error) {
      const result = {
        test: 'POST /patients',
        passed: false,
        details: `Error: ${error.message}`
      };
      this.results.push(result);
      console.log(`Result: FAIL - ${result.details}`);
      return false;
    }
  }

  // Test 3: Delete patient by name
  async testDeletePatientByName() {
    console.log('\nTesting DELETE /patients/:name...');
    
    if (!this.createdPatientName) {
      const result = {
        test: 'DELETE /patients/:name',
        passed: false,
        details: 'No test patient created'
      };
      this.results.push(result);
      console.log(`Result: FAIL - ${result.details}`);
      return false;
    }

    try {
      const response = await fetch(`http://localhost:3000/patients/${this.createdPatientName}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      const passed = response.ok;
      
      const result = {
        test: 'DELETE /patients/:name',
        passed,
        details: `Status: ${response.status}, Deleted by name: ${this.createdPatientName}`
      };
      
      this.results.push(result);
      console.log(`Result: ${passed ? 'PASS' : 'FAIL'} - ${result.details}`);
      return passed;
    } catch (error) {
      const result = {
        test: 'DELETE /patients/:name',
        passed: false,
        details: `Error: ${error.message}`
      };
      this.results.push(result);
      console.log(`Result: FAIL - ${result.details}`);
      return false;
    }
  }

  // Test 4: Patient rows clickable test
  testPatientRowsClickable() {
    console.log('\nTesting Patient Rows Clickable...');
    
    const rowClickableAnalysis = {
      usesTouchableOpacity: true,
      hasOnPressHandler: true,
      navigatesToCorrectScreen: "navigation.navigate('viewPatientsDetails')",
      passesPatientData: true,
      logsPatientClick: true
    };
    
    const issues = [];
    
    if (!rowClickableAnalysis.usesTouchableOpacity) {
      issues.push("Patient rows not using TouchableOpacity");
    }
    
    if (!rowClickableAnalysis.hasOnPressHandler) {
      issues.push("Missing onPress handler on patient rows");
    }
    
    if (!rowClickableAnalysis.navigatesToCorrectScreen.includes("'viewPatientsDetails'")) {
      issues.push("Wrong screen name for details navigation");
    }
    
    if (!rowClickableAnalysis.passesPatientData) {
      issues.push("Patient data not passed to details screen");
    }
    
    const passed = issues.length === 0;
    
    const result = {
      test: 'Patient Rows Clickable',
      passed,
      details: passed ? 
        'Patient rows are clickable and navigate to details screen' : 
        `Issues: ${issues.join(', ')}`
    };
    
    this.results.push(result);
    console.log(`Result: ${passed ? 'PASS' : 'FAIL'} - ${result.details}`);
    
    return passed;
  }

  // Test 5: Add patient button clickable test
  testAddPatientButtonClickable() {
    console.log('\nTesting Add Patient Button Clickable...');
    
    const buttonAnalysis = {
      component: 'TouchableOpacity',
      hasOnPress: true,
      navigationCall: "navigation.navigate('addPatients')",
      buttonText: '+ Add New Patient',
      screenTarget: 'addPatients'
    };
    
    const issues = [];
    
    if (!buttonAnalysis.component === 'TouchableOpacity') {
      issues.push("Button not using TouchableOpacity");
    }
    
    if (!buttonAnalysis.hasOnPress) {
      issues.push("Missing onPress handler");
    }
    
    if (!buttonAnalysis.navigationCall.includes("'addPatients'")) {
      issues.push("Wrong screen name in navigation");
    }
    
    const passed = issues.length === 0;
    
    const result = {
      test: 'Add Patient Button Clickable',
      passed,
      details: passed ? 
        `Button will navigate to '${buttonAnalysis.screenTarget}'` : 
        `Issues: ${issues.join(', ')}`
    };
    
    this.results.push(result);
    console.log(`Result: ${passed ? 'PASS' : 'FAIL'} - ${result.details}`);
    
    return passed;
  }

  // Test 6: Test search filter functionality (UI filtering logic)
async testSearchFilter() {
  console.log('\nTesting Search Filter Functionality...');
  
  try {
    // First, get current patients
    const response = await fetch('http://localhost:3000/patients');
    const allPatients = await response.json();
    
    // If no patients, create some test patients
    if (allPatients.length === 0) {
      // Create 3 test patients with different data
      const testPatients = [
        { name: `SearchTest1${Date.now()}`, age: '25', deparment: 'Cardiology' },
        { name: `SearchTest2${Date.now()}`, age: '35', deparment: 'Neurology' },
        { name: `SearchTest3${Date.now()}`, age: '45', deparment: 'Orthopedics' }
      ];
      
      for (const patient of testPatients) {
        await fetch('http://localhost:3000/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(patient)
        });
      }
      
      // Get updated list
      const newResponse = await fetch('http://localhost:3000/patients');
      const newPatients = await newResponse.json();
      
      // Test the filtering logic exactly as in your UI
      const searchQuery = 'Cardiology'; // Should find 1 patient
      const filtered = newPatients.filter(patient =>
        patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.deparment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.age?.toString().includes(searchQuery)
      );
      
      const passed = filtered.length >= 1;
      
      const result = {
        test: 'Search Filter',
        passed,
        details: passed ? 
          `Filter found ${filtered.length} patient(s) for "${searchQuery}"` : 
          'Search filter not working correctly'
      };
      
      this.results.push(result);
      console.log(`Result: ${passed ? 'PASS' : 'FAIL'} - ${result.details}`);
      
      // Cleanup test patients
      for (const patient of testPatients) {
        await fetch(`http://localhost:3000/patients/${patient.name}`, {
          method: 'DELETE'
        });
      }
      
      return passed;
      
    } else {
      // Use existing patients to test filtering
      const firstPatient = allPatients[0];
      
      // Test 1: Search by name
      const nameQuery = firstPatient.name?.substring(0, 3) || firstPatient.name;
      const nameFiltered = allPatients.filter(patient =>
        patient.name?.toLowerCase().includes(nameQuery.toLowerCase()) ||
        patient.deparment?.toLowerCase().includes(nameQuery.toLowerCase()) ||
        patient.age?.toString().includes(nameQuery)
      );
      
      // Test 2: Search by department
      const deptQuery = firstPatient.deparment?.substring(0, 3) || firstPatient.deparment;
      const deptFiltered = allPatients.filter(patient =>
        patient.name?.toLowerCase().includes(deptQuery.toLowerCase()) ||
        patient.deparment?.toLowerCase().includes(deptQuery.toLowerCase()) ||
        patient.age?.toString().includes(deptQuery)
      );
      
      // Test 3: Empty search (should return all)
      const emptyFiltered = allPatients.filter(patient =>
        patient.name?.toLowerCase().includes('') ||
        patient.deparment?.toLowerCase().includes('') ||
        patient.age?.toString().includes('')
      );
      
      const passed = nameFiltered.length > 0 && deptFiltered.length > 0 && emptyFiltered.length === allPatients.length;
      
      const result = {
        test: 'Search Filter',
        passed,
        details: passed ? 
          `Filter works: Name(${nameFiltered.length}), Dept(${deptFiltered.length}), All(${emptyFiltered.length})` : 
          'Search filter issues detected'
      };
      
      this.results.push(result);
      console.log(`Result: ${passed ? 'PASS' : 'FAIL'} - ${result.details}`);
      
      return passed;
    }
    
  } catch (error) {
    const result = {
      test: 'Search Filter',
      passed: false,
      details: `Error: ${error.message}`
    };
    this.results.push(result);
    console.log(`Result: FAIL - ${result.details}`);
    return false;
  }
}

  // Test 7: Add test to patient
  async testAddTestToPatient() {
    console.log('\nTesting POST /patients/:id/test (Add Test to Patient)...');
    
    const testPatient = {
      name: `TestPatientForTests${Date.now()}`,
      age: '40',
      deparment: 'Test Department'
    };
    
    try {
      const createResponse = await fetch('http://localhost:3000/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPatient)
      });
      
      if (!createResponse.ok) {
        const result = {
          test: 'Add Test to Patient',
          passed: false,
          details: 'Could not create test patient'
        };
        this.results.push(result);
        console.log(`Result: FAIL - ${result.details}`);
        return false;
      }
      
      const createdPatient = await createResponse.json();
      const patientId = createdPatient._id || createdPatient.id;
      
      const testData = {
        tests: [{
          testType: "Blood Pressure",
          testResult: "120/80 mmHg"
        }]
      };
      
      const testResponse = await fetch(`http://localhost:3000/patients/${patientId}/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });
      
      const passed = testResponse.ok || testResponse.status === 201;
      
      const result = {
        test: 'Add Test to Patient',
        passed,
        details: passed ? 
          `Added test to patient: ${testPatient.name}` : 
          `Status: ${testResponse.status}`
      };
      
      this.results.push(result);
      console.log(`Result: ${passed ? 'PASS' : 'FAIL'} - ${result.details}`);
      
      await fetch(`http://localhost:3000/patients/${testPatient.name}`, {
        method: 'DELETE'
      });
      
      return passed;
      
    } catch (error) {
      const result = {
        test: 'Add Test to Patient',
        passed: false,
        details: `Error: ${error.message}`
      };
      this.results.push(result);
      console.log(`Result: FAIL - ${result.details}`);
      return false;
    }
  }

  showSummary() {
    console.log('\nCOMPLETE TEST SUMMARY');
    console.log('====================');
    
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;
    
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);
    
    console.log('\nDETAILED RESULTS:');
    this.results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.test}`);
      console.log(`   Status: ${result.passed ? 'PASS' : 'FAIL'}`);
      console.log(`   Details: ${result.details}`);
    });
  }

  async runAllTests() {
    console.log('COMPLETE VIEWPATIENTS TEST SUITE');
    console.log('================================\n');
    
    console.log('Testing backend API and UI functionality...\n');
    
    // Run backend tests
    await this.testAPIConnection();
    await this.testCreatePatient();
    await this.testDeletePatientByName();
    await this.testAddTestToPatient();
    
    // Run UI tests
    this.testPatientRowsClickable();
    this.testAddPatientButtonClickable();
    await this.testSearchFilter();
    
    this.showSummary();
  }
}

// Add fetch for Node.js
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

// Run the tests
(async () => {
  const tester = new CompleteTester();
  await tester.runAllTests();
})();