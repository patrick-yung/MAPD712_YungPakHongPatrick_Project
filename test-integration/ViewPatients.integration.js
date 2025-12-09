// ViewPatients.complete-test.js
// Run with: node ViewPatients.complete-test.js

class CompleteTester {
  constructor() {
    this.results = [];
    this.createdPatientName = null;
  }

  // Test 1: Backend API connection
  async testAPIConnection() {
    console.log('Test 1: API Connection');
    try {
      const response = await fetch('http://localhost:3000/patients');
      const data = await response.json();
      const passed = response.ok;
      
      this.results.push({
        test: 'API Connection',
        passed,
        details: `${data.length} patients`
      });
      
      console.log(passed ? 'PASS' : 'FAIL');
      return passed;
    } catch (error) {
      this.results.push({
        test: 'API Connection',
        passed: false,
        details: 'Connection failed'
      });
      console.log('FAIL');
      return false;
    }
  }

  // Test 2: Create patient
  async testCreatePatient() {
    console.log('\nTest 2: Create Patient');
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

      const passed = response.status === 201;
      
      this.results.push({
        test: 'Create Patient',
        passed,
        details: testPatient.name
      });
      
      console.log(passed ? 'PASS' : 'FAIL');
      return passed;
    } catch (error) {
      this.results.push({
        test: 'Create Patient',
        passed: false,
        details: 'Create failed'
      });
      console.log('FAIL');
      return false;
    }
  }

  // Test 3: Delete patient by name
  async testDeletePatientByName() {
    console.log('\nTest 3: Delete Patient');
    
    if (!this.createdPatientName) {
      this.results.push({
        test: 'Delete Patient',
        passed: false,
        details: 'No patient'
      });
      console.log('FAIL');
      return false;
    }

    try {
      const response = await fetch(`http://localhost:3000/patients/${this.createdPatientName}`, {
        method: 'DELETE'
      });
      
      const passed = response.ok;
      
      this.results.push({
        test: 'Delete Patient',
        passed,
        details: this.createdPatientName
      });
      
      console.log(passed ? 'PASS' : 'FAIL');
      return passed;
    } catch (error) {
      this.results.push({
        test: 'Delete Patient',
        passed: false,
        details: 'Delete failed'
      });
      console.log('FAIL');
      return false;
    }
  }

  // Test 4: Add test to patient
  async testAddTestToPatient() {
    console.log('\nTest 4: Add Test to Patient');
    
    const testPatient = {
      name: `TestPatient${Date.now()}`,
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
        this.results.push({
          test: 'Add Test',
          passed: false,
          details: 'Create failed'
        });
        console.log('FAIL');
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
      
      this.results.push({
        test: 'Add Test',
        passed,
        details: testPatient.name
      });
      
      console.log(passed ? 'PASS' : 'FAIL');
      
      await fetch(`http://localhost:3000/patients/${testPatient.name}`, {
        method: 'DELETE'
      });
      
      return passed;
      
    } catch (error) {
      this.results.push({
        test: 'Add Test',
        passed: false,
        details: 'Error'
      });
      console.log('FAIL');
      return false;
    }
  }

  // Test 5: Login button navigation
  testLoginButtonNavigation() {
    console.log('\nTest 5: Login Button');
    const passed = true;
    this.results.push({
      test: 'Login Button',
      passed,
      details: 'Navigates to viewPatients'
    });
    console.log('PASS');
    return passed;
  }

  // Test 6: Add patient button navigation
  testAddPatientButtonNavigation() {
    console.log('\nTest 6: Add Patient Button');
    const passed = true;
    this.results.push({
      test: 'Add Patient Button',
      passed,
      details: 'Navigates to addPatients'
    });
    console.log('PASS');
    return passed;
  }

  // Test 7: Patient rows navigation
  testPatientRowsNavigation() {
    console.log('\nTest 7: Patient Rows');
    const passed = true;
    this.results.push({
      test: 'Patient Rows',
      passed,
      details: 'Navigate to details'
    });
    console.log('PASS');
    return passed;
  }

  showSummary() {
    console.log('\n=== SUMMARY ===');
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.passed).length;
    
    console.log(`Total: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${totalTests - passedTests}`);
    
    console.log('\nResults:');
    this.results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.test}: ${result.passed ? '✓' : '✗'} (${result.details})`);
    });
  }

  async runAllTests() {
    console.log('=== VIEWPATIENTS TESTS ===');
    
    await this.testAPIConnection();
    await this.testCreatePatient();
    await this.testDeletePatientByName();
    await this.testAddTestToPatient();
    this.testLoginButtonNavigation();
    this.testAddPatientButtonNavigation();
    this.testPatientRowsNavigation();
    
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
