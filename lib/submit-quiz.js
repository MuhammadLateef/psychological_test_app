export async function submitQuizToSheet(quizData, testType = "BDI") {
    try {
        const demographics = quizData.demographics || {};
        const answers = quizData.answers || {};

        let payload = {
            testType: testType, // "BDI" or "GAD7"
            // Demographics (common for both tests)
            age: demographics.age || "",
            gender: demographics.gender || "",
            maritalStatus: demographics.maritalStatus || "",
            educationLevel: demographics.educationLevel || "",
            employmentStatus: demographics.employmentStatus || "",
            occupation: demographics.occupation || "",
            monthlyIncome: demographics.monthlyIncome || "",
            areaOfResidence: demographics.areaOfResidence || "",
            familySystem: demographics.familySystem || "",
            numberOfDependents: demographics.numberOfDependents || "",
            historyOfDepression: demographics.historyOfDepression || "",
            familyHistoryOfMentalIllness: demographics.familyHistoryOfMentalIllness || "",
            currentTreatment: demographics.currentTreatment || "",
            durationOfDepression: demographics.durationOfDepression || "",
            therapyParticipation: demographics.therapyParticipation || "",
            socialSupportLevel: demographics.socialSupportLevel || "",
            livingSituation: demographics.livingSituation || "",
            majorLifeStressors: demographics.majorLifeStressors || "",
            socialMediaUsage: demographics.socialMediaUsage || "",
            physicalActivityLevel: demographics.physicalActivityLevel || "",
            sleepPatterns: demographics.sleepPatterns || "",
            districtName: demographics.districtName || "",

            // Quiz results
            score: quizData.score || 0,
            severity: quizData.severity || "",
            submittedAt: quizData.submittedAt || new Date().toISOString(),
        };

        // Add test-specific data
        if (testType === "BDI") {
            // BDI specific: individual answer fields
            const answerFields = {};
            Object.keys(answers).forEach(questionId => {
                const answer = answers[questionId];
                answerFields[`${questionId}_score`] = answer.score !== undefined ? answer.score : "";
                answerFields[`${questionId}_label`] = answer.label || "";
            });
            payload = {...payload, ...answerFields };
        } else if (testType === "GAD7") {
            // GAD-7 specific data
            payload.difficulty = Array.isArray(quizData.difficulty) ?
                quizData.difficulty.join(", ") :
                "";

            // Store GAD-7 question scores as a simple array
            payload.questionScores = JSON.stringify(quizData.questionScores || []);
        }

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzFRwyJxRhYd0GcUOvQEeipiEykh_26yBaqXPHlpvS-n4uKRwtQ27wvVcImXdN2ZpKM/exec", {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }
        );

        return { success: true, message: "Successfully saved to Google Sheets!" };
    } catch (error) {
        console.error("Error submitting to Google Sheets:", error);
        return { success: false, message: "Failed to save. Please try again." };
    }
}