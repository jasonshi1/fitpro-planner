import React, { useState } from 'react';
import { Dumbbell, Apple, User, Clock, Target, Plus } from 'lucide-react';

const FitnessApp = () => {
  const [activeTab, setActiveTab] = useState('workout');
  const [userProfile, setUserProfile] = useState({
    weight: '',
    heightFeet: '',
    heightInches: '',
    goal: 'muscle',
    experienceLevel: 'beginner',
    workoutDuration: '30'
  });
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [generatedWorkout, setGeneratedWorkout] = useState(null);
  const [nutritionPlan, setNutritionPlan] = useState(null);

  const bodyParts = [
    'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Glutes', 'Cardio'
  ];

  const goals = [
    { value: 'muscle', label: 'Build Muscle' },
    { value: 'loss', label: 'Weight Loss' },
    { value: 'endurance', label: 'Endurance' },
    { value: 'strength', label: 'Strength' }
  ];

  const foodRecommendations = {
    muscle: {
      proteins: ['Chicken breast', 'Salmon', 'Greek yogurt', 'Eggs', 'Lean beef', 'Whey protein', 'Cottage cheese', 'Tuna'],
      carbs: ['Sweet potatoes', 'Brown rice', 'Oatmeal', 'Quinoa', 'Whole grain pasta', 'Bananas'],
      fats: ['Avocado', 'Almonds', 'Olive oil', 'Peanut butter', 'Chia seeds', 'Walnuts'],
      other: ['Spinach', 'Broccoli', 'Berries', 'Bell peppers']
    },
    loss: {
      proteins: ['Chicken breast', 'Turkey', 'Egg whites', 'Cod', 'Tilapia', 'Protein powder', 'Tofu'],
      carbs: ['Vegetables', 'Cauliflower rice', 'Zucchini noodles', 'Berries', 'Leafy greens'],
      fats: ['Avocado (small portions)', 'Almonds (measured)', 'Olive oil spray', 'Flaxseeds'],
      other: ['Cucumber', 'Celery', 'Asparagus', 'Green tea', 'Water-rich vegetables']
    },
    endurance: {
      proteins: ['Lean chicken', 'Turkey', 'Salmon', 'Legumes', 'Lentils', 'Chickpeas'],
      carbs: ['Whole grain bread', 'Pasta', 'Rice', 'Oats', 'Potatoes', 'Fruits', 'Energy bars'],
      fats: ['Nuts', 'Seeds', 'Nut butters', 'Olive oil', 'Coconut oil'],
      other: ['Bananas', 'Oranges', 'Dates', 'Beetroot', 'Sports drinks (during long sessions)']
    },
    strength: {
      proteins: ['Steak', 'Ground beef', 'Eggs', 'Salmon', 'Greek yogurt', 'Protein shakes', 'Pork chops'],
      carbs: ['White rice', 'Potatoes', 'Pasta', 'Bagels', 'Cereal', 'Fruit'],
      fats: ['Whole eggs', 'Cheese', 'Butter', 'Fatty fish', 'Nuts', 'Dark chocolate'],
      other: ['Whole milk', 'Bananas', 'Spinach', 'Berries']
    }
  };

  const exerciseGuides = {
    'Push-ups': { steps: ['Start in plank position with hands shoulder-width apart', 'Lower body until chest nearly touches floor', 'Push back up to starting position', 'Keep core tight throughout'] },
    'Incline Push-ups': { steps: ['Place hands on elevated surface', 'Lower chest to the surface', 'Push back up', 'Easier variation for beginners'] },
    'Chest Press Machine': { steps: ['Sit with back flat against pad', 'Grip handles at chest level', 'Push handles forward until arms extended', 'Return slowly to starting position'] },
    'Dumbbell Chest Press': { steps: ['Lie on bench with dumbbells at chest level', 'Press weights up until arms extended', 'Lower with control', 'Keep elbows at 45-degree angle'] },
    'Barbell Bench Press': { steps: ['Lie on bench, grip bar slightly wider than shoulders', 'Lower bar to mid-chest', 'Press up explosively', 'Keep feet planted on floor'] },
    'Dumbbell Flyes': { steps: ['Lie on bench with dumbbells above chest', 'Lower weights out to sides with slight bend in elbows', 'Bring weights back together', 'Focus on chest squeeze'] },
    'Cable Crossovers': { steps: ['Stand between cable machines', 'Pull handles down and across body', 'Squeeze chest at bottom', 'Return with control'] },
    'Decline Push-ups': { steps: ['Place feet on elevated surface', 'Hands on ground shoulder-width apart', 'Lower chest to ground', 'Push back up'] },
    'Heavy Bench Press': { steps: ['Use spotter for safety', 'Lower bar slowly to chest', 'Explode up powerfully', 'Focus on progressive overload'] },
    'Weighted Dips': { steps: ['Add weight belt or hold dumbbell', 'Lower body until upper arms parallel to ground', 'Push back up', 'Lean forward for chest emphasis'] },
    'Plyometric Push-ups': { steps: ['Start in push-up position', 'Explode up so hands leave ground', 'Land softly and immediately repeat', 'Advanced power movement'] },
    'Deficit Push-ups': { steps: ['Place hands on raised surfaces', 'Lower chest below hand level', 'Push back up', 'Increases range of motion'] },
    'Resistance Band Rows': { steps: ['Attach band at chest height', 'Pull handles to sides of chest', 'Squeeze shoulder blades together', 'Return with control'] },
    'Lat Pulldown Machine': { steps: ['Grip bar wider than shoulders', 'Pull bar down to upper chest', 'Squeeze lats at bottom', 'Extend arms back up slowly'] },
    'Seated Cable Rows': { steps: ['Sit with feet on platform', 'Pull handle to abdomen', 'Keep back straight', 'Extend arms forward'] },
    'Superman Holds': { steps: ['Lie face down', 'Lift arms and legs off ground', 'Hold position', 'Lower back down'] },
    'Barbell Rows': { steps: ['Bend at hips with bar hanging', 'Pull bar to lower chest', 'Keep back flat', 'Lower with control'] },
    'Pull-ups': { steps: ['Hang from bar with overhand grip', 'Pull chin above bar', 'Lower with control', 'Full range of motion'] },
    'T-Bar Rows': { steps: ['Straddle T-bar', 'Pull bar to chest', 'Keep core tight', 'Lower slowly'] },
    'Face Pulls': { steps: ['Set cable at face height', 'Pull rope to face', 'Separate hands at end', 'Focus on rear delts'] },
    'Weighted Pull-ups': { steps: ['Add weight belt or hold dumbbell', 'Perform standard pull-up', 'Control the descent', 'Advanced strength builder'] },
    'Deadlifts': { steps: ['Stand with bar over mid-foot', 'Grip bar just outside legs', 'Lift by extending hips and knees', 'Keep back neutral throughout'] },
    'Muscle-ups': { steps: ['Start with pull-up', 'Explosively transition to dip', 'Press to full extension', 'Advanced gymnastic move'] },
    'One-Arm Rows': { steps: ['Support body with one hand', 'Pull dumbbell to hip', 'Keep torso stable', 'Control the weight down'] },
    'Dumbbell Shoulder Press': { steps: ['Sit with dumbbells at shoulder level', 'Press weights overhead', 'Lower with control', 'Keep core engaged'] },
    'Front Raises': { steps: ['Hold dumbbells at thighs', 'Raise weights to shoulder height', 'Lower slowly', 'Avoid swinging'] },
    'Lateral Raises': { steps: ['Hold dumbbells at sides', 'Raise arms out to sides', 'Stop at shoulder height', 'Lower with control'] },
    'Resistance Band Press': { steps: ['Stand on band', 'Press handles overhead', 'Extend fully at top', 'Return to shoulders'] },
    'Military Press': { steps: ['Press barbell from shoulders', 'Lock out overhead', 'Lower to collarbone', 'Keep core tight'] },
    'Arnold Press': { steps: ['Start with palms facing you', 'Rotate palms out while pressing up', 'Full overhead extension', 'Reverse on way down'] },
    'Upright Rows': { steps: ['Pull bar up along body', 'Elbows lead the movement', 'Stop at chest height', 'Lower slowly'] },
    'Cable Lateral Raises': { steps: ['Use cable from low position', 'Raise arm out to side', 'Control throughout', 'Focus on deltoid'] },
    'Handstand Push-ups': { steps: ['Kick up to handstand against wall', 'Lower head to ground', 'Press back up', 'Advanced shoulder strength'] },
    'Behind-Neck Press': { steps: ['Lower bar behind head', 'Press overhead', 'Use caution with shoulder mobility', 'Advanced variation'] },
    'Heavy Overhead Press': { steps: ['Press heavy barbell overhead', 'Full lockout at top', 'Lower with control', 'Focus on strength'] },
    'Single-Arm Press': { steps: ['Press one dumbbell at a time', 'Keep body stable', 'Full extension overhead', 'Builds unilateral strength'] },
    'Dumbbell Curls': { steps: ['Hold dumbbells at sides', 'Curl weights to shoulders', 'Keep elbows stationary', 'Lower slowly'] },
    'Tricep Dips': { steps: ['Support body on parallel bars', 'Lower until upper arms parallel to ground', 'Press back up', 'Keep torso upright'] },
    'Hammer Curls': { steps: ['Hold dumbbells with neutral grip', 'Curl to shoulders', 'Keep wrists neutral', 'Lower with control'] },
    'Overhead Tricep Extension': { steps: ['Hold weight overhead', 'Lower behind head', 'Extend back up', 'Keep elbows close to head'] },
    'Barbell Curls': { steps: ['Grip barbell with underhand grip', 'Curl to shoulders', 'No swinging', 'Lower slowly'] },
    'Skull Crushers': { steps: ['Lie on bench with bar above face', 'Lower to forehead', 'Extend back up', 'Keep upper arms stationary'] },
    'Cable Curls': { steps: ['Use cable attachment', 'Curl to shoulders', 'Constant tension', 'Squeeze at top'] },
    'Close-Grip Bench Press': { steps: ['Grip bar narrower than normal', 'Lower to chest', 'Press up', 'Focuses on triceps'] },
    'Weighted Chin-ups': { steps: ['Add weight to pull-up', 'Use underhand grip', 'Pull chin over bar', 'Advanced bicep builder'] },
    'Heavy Barbell Curls': { steps: ['Use challenging weight', 'Strict form', 'Full range of motion', 'Focus on strength'] },
    'Decline Tricep Extension': { steps: ['Lie on decline bench', 'Extend weights overhead', 'Lower to ears', 'Press back up'] },
    'Concentration Curls': { steps: ['Sit with elbow on inner thigh', 'Curl weight to shoulder', 'Full contraction', 'Control descent'] },
    'Bodyweight Squats': { steps: ['Feet shoulder-width apart', 'Lower until thighs parallel to ground', 'Keep chest up', 'Drive through heels'] },
    'Lunges': { steps: ['Step forward into lunge', 'Lower back knee toward ground', 'Push back to start', 'Alternate legs'] },
    'Leg Press': { steps: ['Sit in machine with feet on platform', 'Lower weight with control', 'Press back up', 'Don\'t lock knees'] },
    'Step-ups': { steps: ['Step onto elevated surface', 'Drive through heel', 'Step down with control', 'Alternate legs'] },
    'Barbell Squats': { steps: ['Bar on upper back', 'Descend with control', 'Thighs parallel to ground', 'Drive up through heels'] },
    'Romanian Deadlifts': { steps: ['Hold bar at thighs', 'Hinge at hips', 'Lower bar down legs', 'Feel hamstring stretch'] },
    'Bulgarian Split Squats': { steps: ['Rear foot elevated', 'Lower into lunge', 'Front knee over toes', 'Press back up'] },
    'Leg Curls': { steps: ['Lie face down on machine', 'Curl heels to glutes', 'Squeeze hamstrings', 'Lower slowly'] },
    'Front Squats': { steps: ['Bar in front rack position', 'Keep torso upright', 'Squat deep', 'Drive up explosively'] },
    'Pistol Squats': { steps: ['Stand on one leg', 'Lower on single leg', 'Other leg extends forward', 'Advanced single-leg strength'] },
    'Heavy Deadlifts': { steps: ['Conventional or sumo stance', 'Lift heavy weight', 'Perfect form essential', 'Full hip extension'] },
    'Weighted Lunges': { steps: ['Hold dumbbells or barbell', 'Perform walking or stationary lunges', 'Control throughout', 'Builds leg strength'] },
    'Planks': { steps: ['Forearms on ground', 'Body in straight line', 'Hold position', 'Don\'t let hips sag'] },
    'Crunches': { steps: ['Lie on back, knees bent', 'Lift shoulders off ground', 'Squeeze abs', 'Lower with control'] },
    'Bicycle Crunches': { steps: ['Alternate elbow to opposite knee', 'Extend other leg', 'Controlled rotation', 'Keep lower back pressed down'] },
    'Dead Bugs': { steps: ['Lie on back, arms and legs up', 'Lower opposite arm and leg', 'Return to start', 'Maintain core tension'] },
    'Hanging Leg Raises': { steps: ['Hang from bar', 'Raise legs to 90 degrees', 'Lower with control', 'Avoid swinging'] },
    'Russian Twists': { steps: ['Sit with feet elevated', 'Rotate torso side to side', 'Touch ground each side', 'Keep core engaged'] },
    'Mountain Climbers': { steps: ['Start in plank position', 'Drive knees to chest alternating', 'Keep hips level', 'Maintain tempo'] },
    'Ab Wheel Rollouts': { steps: ['Kneel with ab wheel', 'Roll forward extending body', 'Pull back to start', 'Keep core tight'] },
    'Dragon Flags': { steps: ['Lie on bench holding behind head', 'Raise entire body', 'Lower with control', 'Advanced core exercise'] },
    'Weighted Planks': { steps: ['Add weight plate to back', 'Hold plank position', 'Maintain form', 'Increases difficulty'] },
    'L-Sits': { steps: ['Support body on hands', 'Legs extended forward parallel to ground', 'Hold position', 'Advanced core strength'] },
    'Windshield Wipers': { steps: ['Hang from bar', 'Legs up at 90 degrees', 'Rotate legs side to side', 'Advanced oblique work'] },
    'Glute Bridges': { steps: ['Lie on back, knees bent', 'Lift hips to ceiling', 'Squeeze glutes at top', 'Lower slowly'] },
    'Donkey Kicks': { steps: ['On hands and knees', 'Kick one leg back and up', 'Squeeze glute', 'Control the movement'] },
    'Fire Hydrants': { steps: ['On hands and knees', 'Lift leg out to side', 'Keep knee bent', 'Squeeze glute'] },
    'Clamshells': { steps: ['Lie on side, knees bent', 'Open top knee like a clamshell', 'Keep feet together', 'Feel glute activation'] },
    'Hip Thrusts': { steps: ['Upper back on bench', 'Drive hips up', 'Squeeze glutes at top', 'Lower with control'] },
    'Cable Kickbacks': { steps: ['Attach ankle strap to cable', 'Kick leg back', 'Squeeze glute', 'Control return'] },
    'Single-Leg Deadlifts': { steps: ['Stand on one leg', 'Hinge forward', 'Extend free leg back', 'Balance and control'] },
    'Barbell Hip Thrusts': { steps: ['Bar across hips', 'Thrust hips up', 'Full glute contraction', 'Heavy weight option'] },
    'Weighted Bulgarian Split Squats': { steps: ['Hold dumbbells', 'Rear foot elevated', 'Deep lunge', 'Intense glute work'] },
    'Deficit Reverse Lunges': { steps: ['Start on elevated surface', 'Step back into lunge', 'Increases range of motion', 'Return to platform'] },
    'Heavy RDLs': { steps: ['Heavy Romanian deadlift', 'Focus on glute and hamstring', 'Hinge at hips', 'Feel the stretch'] },
    'Walking': { steps: ['Maintain steady pace', 'Good posture', 'Arm swing natural', 'Low-impact cardio'] },
    'Light Jogging': { steps: ['Easy conversational pace', 'Land midfoot', 'Relaxed shoulders', 'Build endurance'] },
    'Cycling': { steps: ['Adjust seat properly', 'Maintain cadence', 'Vary resistance', 'Low-impact option'] },
    'Elliptical': { steps: ['Upright posture', 'Push and pull handles', 'Adjust resistance as needed', 'Full-body cardio'] },
    'Running': { steps: ['Maintain good form', 'Controlled breathing', 'Appropriate pace', 'Build cardiovascular fitness'] },
    'Jump Rope': { steps: ['Hold handles comfortably', 'Jump on balls of feet', 'Maintain rhythm', 'Great cardio workout'] },
    'Rowing': { steps: ['Legs, core, then arms', 'Pull handle to chest', 'Extend back out', 'Full-body cardio'] },
    'HIIT Intervals': { steps: ['Alternate high and low intensity', 'Work hard during intervals', 'Active recovery between', 'Maximize calorie burn'] },
    'Sprints': { steps: ['Maximum effort runs', 'Proper warm-up essential', 'Full recovery between', 'Builds explosive power'] },
    'Burpees': { steps: ['Drop to plank', 'Push-up', 'Jump feet to hands', 'Jump up explosively'] },
    'Box Jumps': { steps: ['Jump onto elevated box', 'Land softly', 'Step down', 'Explosive leg power'] },
    'Battle Ropes': { steps: ['Hold rope ends', 'Create waves with arms', 'Various patterns', 'Upper body cardio'] }
  };

  const exerciseDatabase = {
    Chest: {
      beginner: ['Push-ups', 'Incline Push-ups', 'Chest Press Machine', 'Dumbbell Chest Press'],
      intermediate: ['Barbell Bench Press', 'Dumbbell Flyes', 'Cable Crossovers', 'Decline Push-ups'],
      advanced: ['Heavy Bench Press', 'Weighted Dips', 'Plyometric Push-ups', 'Deficit Push-ups']
    },
    Back: {
      beginner: ['Resistance Band Rows', 'Lat Pulldown Machine', 'Seated Cable Rows', 'Superman Holds'],
      intermediate: ['Barbell Rows', 'Pull-ups', 'T-Bar Rows', 'Face Pulls'],
      advanced: ['Weighted Pull-ups', 'Deadlifts', 'Muscle-ups', 'One-Arm Rows']
    },
    Shoulders: {
      beginner: ['Dumbbell Shoulder Press', 'Front Raises', 'Lateral Raises', 'Resistance Band Press'],
      intermediate: ['Military Press', 'Arnold Press', 'Upright Rows', 'Cable Lateral Raises'],
      advanced: ['Handstand Push-ups', 'Behind-Neck Press', 'Heavy Overhead Press', 'Single-Arm Press']
    },
    Arms: {
      beginner: ['Dumbbell Curls', 'Tricep Dips', 'Hammer Curls', 'Overhead Tricep Extension'],
      intermediate: ['Barbell Curls', 'Skull Crushers', 'Cable Curls', 'Close-Grip Bench Press'],
      advanced: ['Weighted Chin-ups', 'Heavy Barbell Curls', 'Decline Tricep Extension', 'Concentration Curls']
    },
    Legs: {
      beginner: ['Bodyweight Squats', 'Lunges', 'Leg Press', 'Step-ups'],
      intermediate: ['Barbell Squats', 'Romanian Deadlifts', 'Bulgarian Split Squats', 'Leg Curls'],
      advanced: ['Front Squats', 'Pistol Squats', 'Heavy Deadlifts', 'Weighted Lunges']
    },
    Core: {
      beginner: ['Planks', 'Crunches', 'Bicycle Crunches', 'Dead Bugs'],
      intermediate: ['Hanging Leg Raises', 'Russian Twists', 'Mountain Climbers', 'Ab Wheel Rollouts'],
      advanced: ['Dragon Flags', 'Weighted Planks', 'L-Sits', 'Windshield Wipers']
    },
    Glutes: {
      beginner: ['Glute Bridges', 'Donkey Kicks', 'Fire Hydrants', 'Clamshells'],
      intermediate: ['Hip Thrusts', 'Cable Kickbacks', 'Single-Leg Deadlifts', 'Step-ups'],
      advanced: ['Barbell Hip Thrusts', 'Weighted Bulgarian Split Squats', 'Deficit Reverse Lunges', 'Heavy RDLs']
    },
    Cardio: {
      beginner: ['Walking', 'Light Jogging', 'Cycling', 'Elliptical'],
      intermediate: ['Running', 'Jump Rope', 'Rowing', 'HIIT Intervals'],
      advanced: ['Sprints', 'Burpees', 'Box Jumps', 'Battle Ropes']
    }
  };

  const [expandedExercise, setExpandedExercise] = useState(null);

  const toggleExerciseGuide = (exerciseName) => {
    setExpandedExercise(expandedExercise === exerciseName ? null : exerciseName);
  };

  const toggleBodyPart = (part) => {
    setSelectedBodyParts(prev =>
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const generateWorkout = () => {
    if (selectedBodyParts.length === 0) {
      alert('Please select at least one body part');
      return;
    }

    const duration = parseInt(userProfile.workoutDuration);
    const exercisesPerBodyPart = Math.max(2, Math.floor(duration / (selectedBodyParts.length * 5)));
    
    const workout = selectedBodyParts.map(bodyPart => {
      const exercises = exerciseDatabase[bodyPart][userProfile.experienceLevel];
      const selectedExercises = exercises.slice(0, exercisesPerBodyPart);
      
      return {
        bodyPart,
        exercises: selectedExercises.map(exercise => ({
          name: exercise,
          sets: userProfile.experienceLevel === 'beginner' ? 3 : userProfile.experienceLevel === 'intermediate' ? 4 : 5,
          reps: userProfile.goal === 'strength' ? '3-5' : userProfile.goal === 'muscle' ? '8-12' : '12-15',
          rest: userProfile.experienceLevel === 'beginner' ? '60s' : '45s'
        }))
      };
    });

    setGeneratedWorkout(workout);
  };

  const generateNutritionPlan = () => {
    const weight = parseFloat(userProfile.weight);
    const heightFeet = parseFloat(userProfile.heightFeet) || 0;
    const heightInches = parseFloat(userProfile.heightInches) || 0;
    const totalInches = (heightFeet * 12) + heightInches;

    if (!weight || !totalInches) {
      alert('Please enter your weight and height');
      return;
    }

    const heightCm = totalInches * 2.54;
    const weightKg = weight * 0.453592;
    const bmi = (weightKg / ((heightCm / 100) ** 2)).toFixed(1);
    
    let calories, protein, carbs, fats;
    
    switch(userProfile.goal) {
      case 'muscle':
        calories = Math.round(weight * 17);
        protein = Math.round(weight * 1.0);
        carbs = Math.round(weight * 2.5);
        fats = Math.round(weight * 0.4);
        break;
      case 'loss':
        calories = Math.round(weight * 12);
        protein = Math.round(weight * 0.9);
        carbs = Math.round(weight * 1.5);
        fats = Math.round(weight * 0.3);
        break;
      case 'endurance':
        calories = Math.round(weight * 18);
        protein = Math.round(weight * 0.7);
        carbs = Math.round(weight * 3.0);
        fats = Math.round(weight * 0.35);
        break;
      default:
        calories = Math.round(weight * 15);
        protein = Math.round(weight * 0.8);
        carbs = Math.round(weight * 2.0);
        fats = Math.round(weight * 0.35);
    }

    setNutritionPlan({
      bmi,
      dailyCalories: calories,
      protein,
      carbs,
      fats,
      foodRecommendations: foodRecommendations[userProfile.goal],
      meals: [
        { name: 'Breakfast', calories: Math.round(calories * 0.3) },
        { name: 'Lunch', calories: Math.round(calories * 0.35) },
        { name: 'Dinner', calories: Math.round(calories * 0.25) },
        { name: 'Snacks', calories: Math.round(calories * 0.1) }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Dumbbell className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              FitPro Planner
            </h1>
          </div>
          <p className="text-gray-300">Your Personal Fitness & Nutrition Assistant</p>
          <br></br>
          <p className="text-gray-300">Created By: Jason Shi</p>
        </header>

        <div className="flex gap-4 mb-8 justify-center flex-wrap">
          <button
            onClick={() => setActiveTab('workout')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition ${
              activeTab === 'workout'
                ? 'bg-blue-600 shadow-lg shadow-blue-500/50'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <Dumbbell className="w-5 h-5" />
            Workout Builder
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition ${
              activeTab === 'nutrition'
                ? 'bg-blue-600 shadow-lg shadow-blue-500/50'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <Apple className="w-5 h-5" />
            Nutrition Plan
          </button>
        </div>

        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            Your Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Weight (lbs)</label>
              <input
                type="number"
                value={userProfile.weight}
                onChange={(e) => setUserProfile({...userProfile, weight: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="150"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Height (feet)</label>
              <input
                type="number"
                value={userProfile.heightFeet}
                onChange={(e) => setUserProfile({...userProfile, heightFeet: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="5"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Height (inches)</label>
              <input
                type="number"
                value={userProfile.heightInches}
                onChange={(e) => setUserProfile({...userProfile, heightInches: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Fitness Goal</label>
              <select
                value={userProfile.goal}
                onChange={(e) => setUserProfile({...userProfile, goal: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {goals.map(g => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Experience Level</label>
              <select
                value={userProfile.experienceLevel}
                onChange={(e) => setUserProfile({...userProfile, experienceLevel: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Workout Duration (min)
              </label>
              <select
                value={userProfile.workoutDuration}
                onChange={(e) => setUserProfile({...userProfile, workoutDuration: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
              </select>
            </div>
          </div>
        </div>

        {activeTab === 'workout' && (
          <div className="space-y-6">
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Select Target Body Parts
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {bodyParts.map(part => (
                  <button
                    key={part}
                    onClick={() => toggleBodyPart(part)}
                    className={`py-3 px-4 rounded-lg font-medium transition ${
                      selectedBodyParts.includes(part)
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>
              <button
                onClick={generateWorkout}
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-3 rounded-lg font-semibold shadow-lg transition flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Generate Workout Plan
              </button>
            </div>

            {generatedWorkout && (
              <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Your Custom Workout Plan
                </h2>
                <div className="space-y-6">
                  {generatedWorkout.map((section, idx) => (
                    <div key={idx} className="bg-gray-800/50 rounded-lg p-5">
                      <h3 className="text-lg font-semibold mb-4 text-blue-300 border-b border-gray-600 pb-2">
                        {section.bodyPart}
                      </h3>
                      <div className="space-y-3">
                        {section.exercises.map((exercise, exIdx) => (
                          <div key={exIdx} className="bg-gray-900/70 rounded overflow-hidden">
                            <div 
                              className="p-4 cursor-pointer hover:bg-gray-800/70 transition"
                              onClick={() => toggleExerciseGuide(exercise.name)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="font-medium text-white">{exercise.name}</div>
                                <button className="text-blue-400 text-sm hover:text-blue-300">
                                  {expandedExercise === exercise.name ? '▼ Hide Guide' : '▶ Show Guide'}
                                </button>
                              </div>
                              <div className="flex gap-4 text-sm text-gray-300">
                                <span className="bg-blue-900/50 px-3 py-1 rounded">{exercise.sets} sets</span>
                                <span className="bg-cyan-900/50 px-3 py-1 rounded">{exercise.reps} reps</span>
                                <span className="bg-gray-800/50 px-3 py-1 rounded">Rest: {exercise.rest}</span>
                              </div>
                            </div>
                            
                            {expandedExercise === exercise.name && exerciseGuides[exercise.name] && (
                              <div className="px-4 pb-4 border-t border-gray-700 pt-4">
                                <h4 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
                                  <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs">📋</span>
                                  How to Perform
                                </h4>
                                <ol className="space-y-2">
                                  {exerciseGuides[exercise.name].steps.map((step, stepIdx) => (
                                    <li key={stepIdx} className="text-sm text-gray-300 flex gap-3">
                                      <span className="text-blue-400 font-semibold min-w-[20px]">{stepIdx + 1}.</span>
                                      <span>{step}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="space-y-6">
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <button
                onClick={generateNutritionPlan}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-3 rounded-lg font-semibold shadow-lg transition flex items-center justify-center gap-2"
              >
                <Apple className="w-5 h-5" />
                Generate Nutrition Plan
              </button>
            </div>

            {nutritionPlan && (
              <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Your Personalized Nutrition Plan
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-800/50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold mb-4 text-blue-300">Body Stats</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">BMI</span>
                        <span className="font-semibold">{nutritionPlan.bmi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Daily Calories</span>
                        <span className="font-semibold text-blue-400">{nutritionPlan.dailyCalories} kcal</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold mb-4 text-blue-300">Macros (Daily)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Protein</span>
                        <span className="font-semibold text-cyan-400">{nutritionPlan.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Carbs</span>
                        <span className="font-semibold text-blue-400">{nutritionPlan.carbs}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Fats</span>
                        <span className="font-semibold text-yellow-400">{nutritionPlan.fats}g</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold mb-4 text-blue-300">Meal Distribution</h3>
                  <div className="space-y-3">
                    {nutritionPlan.meals.map((meal, idx) => (
                      <div key={idx} className="bg-gray-900/70 rounded p-4 flex justify-between items-center">
                        <span className="font-medium">{meal.name}</span>
                        <span className="bg-blue-900/50 px-4 py-1 rounded font-semibold">{meal.calories} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold mb-4 text-blue-300">Recommended Foods</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-cyan-400 mb-2">🥩 Proteins</h4>
                      <ul className="space-y-1">
                        {nutritionPlan.foodRecommendations.proteins.map((food, idx) => (
                          <li key={idx} className="text-sm text-gray-300 pl-2">• {food}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-yellow-400 mb-2">🍞 Carbohydrates</h4>
                      <ul className="space-y-1">
                        {nutritionPlan.foodRecommendations.carbs.map((food, idx) => (
                          <li key={idx} className="text-sm text-gray-300 pl-2">• {food}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-green-400 mb-2">🥑 Healthy Fats</h4>
                      <ul className="space-y-1">
                        {nutritionPlan.foodRecommendations.fats.map((food, idx) => (
                          <li key={idx} className="text-sm text-gray-300 pl-2">• {food}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-purple-400 mb-2">🥗 Other Essentials</h4>
                      <ul className="space-y-1">
                        {nutritionPlan.foodRecommendations.other.map((food, idx) => (
                          <li key={idx} className="text-sm text-gray-300 pl-2">• {food}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FitnessApp;