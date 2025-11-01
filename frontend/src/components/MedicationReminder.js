

// import React, { useState, useEffect } from 'react';
// import './MedicationReminder.css';
// import { useAuth } from '../context/AuthContext';
// import ImageUpload from './ImageUpload';

// const MedicationReminder = () => {
//   const { user, logout } = useAuth();

//   const [medications, setMedications] = useState(() => {
//     const saved = localStorage.getItem(`medications_${user.id}`);
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [newMed, setNewMed] = useState({
//     name: '',
//     time: '',
//     prescriptionImage: '',
//     done: false,
//   });

//   useEffect(() => {
//     if (user && user.id) {
//       localStorage.setItem(`medications_${user.id}`, JSON.stringify(medications));
//     }
//   }, [medications, user]);

//   const handleImageUpload = (imageUrl) => {
//     setNewMed({ ...newMed, prescriptionImage: imageUrl });
//   };

//   const handleAddMedication = (e) => {
//     e.preventDefault();
//     if (newMed.name.trim() && newMed.time) {
//       setMedications([...medications, { ...newMed, id: Date.now() }]);
//       setNewMed({ name: '', time: '', prescriptionImage: '', done: false });
//     }
//   };

//   const handleDelete = (id) => {
//     setMedications(medications.filter((med) => med.id !== id));
//   };

//   const handleMarkAsDone = (id) => {
//     setMedications(
//       medications.map((med) =>
//         med.id === id ? { ...med, done: !med.done } : med
//       )
//     );
//   };

//   const speakReminder = (medName) => {
//     const message = new SpeechSynthesisUtterance(`It's time to take your medication: ${medName}`);
//     speechSynthesis.speak(message);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const currentTime = now.toTimeString().slice(0, 5);
//       medications.forEach((med) => {
//         if (med.time === currentTime && !med.done) {
//           speakReminder(med.name);
//         }
//       });
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [medications]);

//   return (
//     <div className="medication-reminder">
//       <div className="header-container">
//         <h2>Medication Reminder</h2>
//         <button className="logout-button" onClick={logout}>Logout</button>
//       </div>

//       <form onSubmit={handleAddMedication} className="add-medication-form">
//         <div className="form-group">
//           <label>Medication Name</label>
//           <input
//             type="text"
//             placeholder="Enter medication name"
//             value={newMed.name}
//             onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Time</label>
//           <input
//             type="time"
//             value={newMed.time}
//             onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
//             required
//           />
//         </div>

//         <ImageUpload onUpload={handleImageUpload} />
//         {newMed.prescriptionImage && (
//           <div className="image-preview">
//             <img src={newMed.prescriptionImage} alt="Prescription" />
//           </div>
//         )}

//         <button type="submit">Add Medication</button>
//       </form>

//       <div className="medications-list">
//         <h3>Your Medications</h3>
//         {medications.map((med) => (
//           <div key={med.id} className={`medication-item ${med.done ? 'done' : ''}`}>
//             <h4>{med.name}</h4>
//             <p>Time: {med.time}</p>
//             {med.prescriptionImage && (
//               <img src={med.prescriptionImage} alt="Prescription" className="med-image" />
//             )}
//             <button className="done-button" onClick={() => handleMarkAsDone(med.id)}>
//               {med.done ? 'done' : 'Mark as Done'}
//             </button>
//             <button className="delete-button" onClick={() => handleDelete(med.id)}>Remove</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MedicationReminder;



// import React, { useState, useEffect } from 'react';
// import './MedicationReminder.css';
// import { useAuth } from '../context/AuthContext';
// import ImageUpload from './ImageUpload';
// import { sendSMS } from '../services/api';

// const MedicationReminder = () => {
//   const { user, logout } = useAuth();

//   const [medications, setMedications] = useState(() => {
//     const saved = localStorage.getItem(`medications_${user?.id}`);
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [newMed, setNewMed] = useState({
//     name: '',
//     time: '',
//     prescriptionImage: '',
//     done: false,
//   });

//   useEffect(() => {
//     if (user && user.id) {
//       localStorage.setItem(`medications_${user.id}`, JSON.stringify(medications));
//     }
//   }, [medications, user]);

//   const handleImageUpload = (imageUrl) => {
//     setNewMed({ ...newMed, prescriptionImage: imageUrl });
//   };

//   const handleSendSMS = async (medName) => {
//     const numbers = ['+917200065499', '+917305939380', '+918925495889'];
//     const message = `Reminder: It's time to take your medication - ${medName}!`;

//     try {
//       const response = await sendSMS(numbers, message);
//       alert(`SMS Sent: ${response.message}`);
//     } catch (error) {
//       alert("Failed to send SMS!");
//     }
//   };

//   const handleAddMedication = (e) => {
//     e.preventDefault();
//     if (newMed.name.trim() && newMed.time) {
//       setMedications([...medications, { ...newMed, id: Date.now() }]);
//       setNewMed({ name: '', time: '', prescriptionImage: '', done: false });
//     }
//   };

//   const handleDelete = (id) => {
//     setMedications(medications.filter((med) => med.id !== id));
//   };

//   const handleMarkAsDone = (id) => {
//     setMedications(
//       medications.map((med) =>
//         med.id === id ? { ...med, done: !med.done } : med
//       )
//     );
//   };

//   const speakReminder = (medName) => {
//     const message = new SpeechSynthesisUtterance(`It's time to take your medication: ${medName}`);
//     speechSynthesis.speak(message);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const currentTime = now.toTimeString().slice(0, 5);

//       medications.forEach((med) => {
//         if (med.time === currentTime && !med.done) {
//           speakReminder(med.name); // Voice reminder
//           handleSendSMS(med.name); // SMS reminder
//         }
//       });
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [medications]);

//   return (
//     <div className="medication-reminder">
//       <div className="header-container">
//         <h2>Medication Reminder</h2>
//         <button className="logout-button" onClick={logout}>Logout</button>
//       </div>

//       <form onSubmit={handleAddMedication} className="add-medication-form">
//         <div className="form-group">
//           <label>Medication Name</label>
//           <input
//             type="text"
//             placeholder="Enter medication name"
//             value={newMed.name}
//             onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Time</label>
//           <input
//             type="time"
//             value={newMed.time}
//             onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
//             required
//           />
//         </div>

//         <ImageUpload onUpload={handleImageUpload} />
//         {newMed.prescriptionImage && (
//           <div className="image-preview">
//             <img src={newMed.prescriptionImage} alt="Prescription" />
//           </div>
//         )}

//         <button type="submit">Add Medication</button>
//       </form>

//       <div className="medications-list">
//         <h3>Your Medications</h3>
//         {medications.map((med) => (
//           <div key={med.id} className={`medication-item ${med.done ? 'done' : ''}`}>
//             <h4>{med.name}</h4>
//             <p>Time: {med.time}</p>
//             {med.prescriptionImage && (
//               <img src={med.prescriptionImage} alt="Prescription" className="med-image" />
//             )}
//             <button className="done-button" onClick={() => handleMarkAsDone(med.id)}>
//               {med.done ? 'Done' : 'Mark as Done'}
//             </button>
//             <button className="delete-button" onClick={() => handleDelete(med.id)}>Remove</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MedicationReminder;

import React, { useState, useEffect } from 'react';
import './MedicationReminder.css';
import { useAuth } from '../context/AuthContext';
import ImageUpload from './ImageUpload';
import { sendSMS } from '../services/api';

const MedicationReminder = () => {
  const { user, logout } = useAuth();

  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem(`medications_${user?.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [emergencyNumber, setEmergencyNumber] = useState(() => {
    return localStorage.getItem(`emergencyNumber_${user?.id}`) || '';
  });

  const [newMed, setNewMed] = useState({
    name: '',
    time: '',
    prescriptionImage: '',
    done: false,
  });

  useEffect(() => {
    if (user && user.id) {
      localStorage.setItem(`medications_${user.id}`, JSON.stringify(medications));
      localStorage.setItem(`emergencyNumber_${user.id}`, emergencyNumber);
    }
  }, [medications, emergencyNumber, user]);

  const handleImageUpload = (imageUrl) => {
    setNewMed({ ...newMed, prescriptionImage: imageUrl });
  };

  const handleSendSMS = async (medName) => {
    if (!emergencyNumber) {
      console.error("Emergency number is not set!");
      return;
    }
    const message = `Reminder: It's time to take your medication - ${medName}!`;
    try {
      const response = await sendSMS([emergencyNumber], message);
      console.log(`SMS Sent: ${response.message}`);
    } catch (error) {
      console.error("Failed to send SMS!", error);
    }
  };

  const handleAddMedication = (e) => {
    e.preventDefault();
    if (newMed.name.trim() && newMed.time) {
      setMedications([...medications, { ...newMed, id: Date.now() }]);
      setNewMed({ name: '', time: '', prescriptionImage: '', done: false });
    }
  };

  const handleDelete = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const handleMarkAsDone = (id) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, done: !med.done } : med
      )
    );
  };

  const speakReminder = async (medName) => {
    const message = new SpeechSynthesisUtterance(`It's time to take your medication: ${medName}`);
    speechSynthesis.speak(message);
    await handleSendSMS(medName);
  };

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      
      medications.forEach((med) => {
        if (med.time === currentTime && !med.done) {
          speakReminder(med.name);
        }
      });
    };

    checkReminders();
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [medications]);

  return (
    <div className="medication-reminder">
      <div className="header-container">
        <h2>Medication Reminder</h2>
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>

      <div className="form-group">
        <label>Emergency Contact Number</label>
        <input
          type="tel"
          placeholder="Enter emergency contact number"
          value={emergencyNumber}
          onChange={(e) => setEmergencyNumber(e.target.value)}
          required
        />
      </div>

      <form onSubmit={handleAddMedication} className="add-medication-form">
        <div className="form-group">
          <label>Medication Name</label>
          <input
            type="text"
            placeholder="Enter medication name"
            value={newMed.name}
            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            value={newMed.time}
            onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
            required
          />
        </div>

        <ImageUpload onUpload={handleImageUpload} />
        {newMed.prescriptionImage && (
          <div className="image-preview">
            <img src={newMed.prescriptionImage} alt="Prescription" />
          </div>
        )}

        <button type="submit">Add Medication</button>
      </form>

      <div className="medications-list">
        <h3>Your Medications</h3>
        {medications.map((med) => (
          <div key={med.id} className={`medication-item ${med.done ? 'done' : ''}`}>
            <h4>{med.name}</h4>
            <p>Time: {med.time}</p>
            {med.prescriptionImage && (
              <img src={med.prescriptionImage} alt="Prescription" className="med-image" />
            )}
            <button className="done-button" onClick={() => handleMarkAsDone(med.id)}>
              {med.done ? 'Done' : 'Mark as Done'}
            </button>
            <button className="delete-button" onClick={() => handleDelete(med.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationReminder;
