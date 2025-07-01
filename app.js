// Application data
const appData = {
    sampleActivities: [
        {"category": "Virtual Dates", "name": "Cook the Same Meal Together", "difficulty": "Easy"},
        {"category": "Virtual Dates", "name": "Virtual Museum Tour", "difficulty": "Medium"},
        {"category": "Games", "name": "Online Trivia Night", "difficulty": "Easy"},
        {"category": "Games", "name": "Virtual Escape Room", "difficulty": "Hard"},
        {"category": "Learning Together", "name": "Learn a New Language", "difficulty": "Hard"},
        {"category": "Learning Together", "name": "Watch TED Talks Together", "difficulty": "Easy"},
        {"category": "Creative Projects", "name": "Create a Shared Playlist", "difficulty": "Easy"},
        {"category": "Creative Projects", "name": "Write a Story Together", "difficulty": "Medium"}
    ],
    achievementBadges: [
        {"name": "Week Strong", "description": "7 day check-in streak", "icon": "🔥"},
        {"name": "Goal Getter", "description": "Complete your first goal", "icon": "🎯"},
        {"name": "Activity Expert", "description": "Try 10 different activities", "icon": "🌟"},
        {"name": "Feedback Friend", "description": "Give constructive feedback", "icon": "💝"},
        {"name": "Memory Maker", "description": "Upload 50 photos", "icon": "📸"}
    ],
    feedbackTemplates: [
        "I feel loved when you...",
        "I feel supported when you...",
        "I would appreciate if you could...",
        "Something I admire about you is...",
        "I feel closer to you when we..."
    ]
};

// Application state
let currentUser = {
    name: '',
    partnerName: '',
    startDate: '',
    timezone: '',
    partnerTimezone: ''
};

let appState = {
    currentScreen: 'welcome-screen',
    currentModule: 'dashboard',
    streakCount: 7,
    goalCount: 3,
    memoryCount: 47,
    daysTogether: 124
};

// Screen Management Functions
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        appState.currentScreen = screenId;
    }
}

function showWelcome() {
    showScreen('welcome-screen');
}

function showProfileSetup() {
    showScreen('profile-setup');
}

function showLogin() {
    showScreen('login-screen');
}

function showMainApp() {
    showScreen('main-app');
    showDashboard();
}

function completeProfiling() {
    // Get form values
    currentUser.name = document.getElementById('user1-name').value;
    currentUser.partnerName = document.getElementById('user2-name').value;
    currentUser.startDate = document.getElementById('start-date').value;
    currentUser.timezone = document.getElementById('timezone1').value;
    currentUser.partnerTimezone = document.getElementById('timezone2').value;
    
    // Basic validation
    if (!currentUser.name || !currentUser.partnerName) {
        alert('Please fill in both names to continue.');
        return;
    }
    
    // Calculate days together if start date is provided
    if (currentUser.startDate) {
        const startDate = new Date(currentUser.startDate);
        const today = new Date();
        const timeDiff = today.getTime() - startDate.getTime();
        appState.daysTogether = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    
    // Show achievement notification
    showAchievementNotification("Welcome to bleb! 🎉", "Your love journey begins now!");
    
    // Navigate to main app
    setTimeout(() => {
        showMainApp();
    }, 1000);
}

// Module Navigation Functions
function showDashboard() {
    // Hide all main content areas
    document.querySelectorAll('.main-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show dashboard
    document.getElementById('dashboard').classList.add('active');
    appState.currentModule = 'dashboard';
    
    // Update navigation
    updateBottomNavigation('dashboard');
    
    // Update stats
    updateDashboardStats();
}

function showModule(moduleId) {
    // Hide all main content areas
    document.querySelectorAll('.main-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show target module
    const targetModule = document.getElementById(moduleId);
    if (targetModule) {
        targetModule.classList.add('active');
        appState.currentModule = moduleId;
        
        // Initialize module-specific content
        initializeModule(moduleId);
    }
    
    // Update navigation
    updateBottomNavigation(moduleId);
}

function updateBottomNavigation(activeModule) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Map modules to nav items
    const navMapping = {
        'dashboard': 0,
        'daily-checkin': 1,
        'goals': 2,
        'activities': 3,
        'feedback': 4,
        'memory': 5
    };
    
    const navItems = document.querySelectorAll('.nav-item');
    const activeIndex = navMapping[activeModule];
    if (activeIndex !== undefined && navItems[activeIndex]) {
        navItems[activeIndex].classList.add('active');
    }
}

// Module Initialization Functions
function initializeModule(moduleId) {
    switch(moduleId) {
        case 'activities':
            populateActivities();
            break;
        case 'goals':
            initializeGoals();
            break;
        case 'feedback':
            initializeFeedback();
            break;
        case 'daily-checkin':
            initializeDailyCheckin();
            break;
        case 'communication':
            updateTimeZones();
            break;
        default:
            break;
    }
}

// Daily Check-in Functions
function initializeDailyCheckin() {
    const moodSlider = document.getElementById('mood-range');
    const moodDisplay = document.querySelector('.mood-display');
    
    if (moodSlider && moodDisplay) {
        moodSlider.addEventListener('input', function() {
            const value = this.value;
            const moods = {
                1: '😢', 2: '😔', 3: '😐', 4: '🙂', 5: '😊',
                6: '😄', 7: '😁', 8: '🤗', 9: '😍', 10: '🥰'
            };
            moodDisplay.textContent = `${moods[value]} ${value}/10`;
        });
    }
}

// Goals Functions
function initializeGoals() {
    showGoalTab('personal');
}

function showGoalTab(tabType) {
    // Hide all goal contents
    document.querySelectorAll('.goals-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show target content
    const targetContent = document.getElementById(`${tabType}-goals`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Update tab buttons
    document.querySelectorAll('.goals-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
}

// Activities Functions
function populateActivities() {
    const activitiesList = document.getElementById('activities-list');
    if (!activitiesList) return;
    
    activitiesList.innerHTML = '';
    
    appData.sampleActivities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        const difficultyClass = `difficulty-${activity.difficulty.toLowerCase()}`;
        
        activityItem.innerHTML = `
            <div class="activity-info">
                <h4>${activity.name}</h4>
                <p>${activity.category}</p>
            </div>
            <div class="difficulty-badge ${difficultyClass}">
                ${activity.difficulty}
            </div>
        `;
        
        activitiesList.appendChild(activityItem);
    });
}

function showActivityCategory(category) {
    const activitiesList = document.getElementById('activities-list');
    if (!activitiesList) return;
    
    activitiesList.innerHTML = '';
    
    let filteredActivities = appData.sampleActivities;
    
    if (category !== 'all') {
        const categoryMap = {
            'virtual-dates': 'Virtual Dates',
            'games': 'Games',
            'learning': 'Learning Together'
        };
        
        const targetCategory = categoryMap[category];
        if (targetCategory) {
            filteredActivities = appData.sampleActivities.filter(activity => 
                activity.category === targetCategory
            );
        }
    }
    
    filteredActivities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        const difficultyClass = `difficulty-${activity.difficulty.toLowerCase()}`;
        
        activityItem.innerHTML = `
            <div class="activity-info">
                <h4>${activity.name}</h4>
                <p>${activity.category}</p>
            </div>
            <div class="difficulty-badge ${difficultyClass}">
                ${activity.difficulty}
            </div>
        `;
        
        activitiesList.appendChild(activityItem);
    });
    
    // Update active tab
    document.querySelectorAll('.category-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
}

function spinWheel() {
    const wheel = document.querySelector('.wheel');
    const activities = appData.sampleActivities;
    
    if (!wheel) return;
    
    // Add spinning animation
    wheel.classList.add('spinning');
    
    // Stop spinning after 2 seconds and show result
    setTimeout(() => {
        wheel.classList.remove('spinning');
        
        // Get random activity
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        // Show result
        showAchievementNotification(
            `🎲 Activity Suggestion: ${randomActivity.name}`,
            `Category: ${randomActivity.category} • Difficulty: ${randomActivity.difficulty}`
        );
    }, 2000);
}

// Feedback Functions
function initializeFeedback() {
    showFeedbackTab('give');
}

function showFeedbackTab(tabType) {
    // Hide all feedback contents
    document.querySelectorAll('.feedback-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show target content
    const targetContent = document.getElementById(`${tabType}-feedback`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Update tab buttons
    document.querySelectorAll('.feedback-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
}

// Communication Functions
function updateTimeZones() {
    const userTimeElement = document.getElementById('user-time');
    const partnerTimeElement = document.getElementById('partner-time');
    
    if (userTimeElement && partnerTimeElement) {
        const now = new Date();
        const userTime = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        
        // For demo purposes, show partner time as 6 hours ahead
        const partnerTime = new Date(now.getTime() + (6 * 60 * 60 * 1000));
        const partnerTimeString = partnerTime.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        
        userTimeElement.textContent = userTime;
        partnerTimeElement.textContent = partnerTimeString;
    }
}

// Dashboard Functions
function updateDashboardStats() {
    // Update stats cards with current values
    const statCards = document.querySelectorAll('.stat-card .stat-number');
    if (statCards.length >= 3) {
        statCards[0].textContent = appState.streakCount;
        statCards[1].textContent = appState.goalCount;
        statCards[2].textContent = appState.daysTogether;
    }
}

// Utility Functions
function showAchievementNotification(title, description) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 4px;">${title}</div>
        <div style="font-size: 12px; opacity: 0.9;">${description}</div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

function handleFormSubmission(formType) {
    switch(formType) {
        case 'checkin':
            appState.streakCount++;
            showAchievementNotification("Daily Check-in Complete! 🔥", `Streak: ${appState.streakCount} days`);
            break;
        case 'goal':
            appState.goalCount++;
            showAchievementNotification("New Goal Created! 🎯", "Keep pushing forward together!");
            break;
        case 'feedback':
            showAchievementNotification("Feedback Planted! 🌱", "Your garden is growing stronger!");
            break;
        case 'gratitude':
            showAchievementNotification("Gratitude Boost Sent! ✨", "Spreading love and positivity!");
            break;
        case 'message':
            showAchievementNotification("Message Sent! 💕", "Staying connected across the distance!");
            break;
    }
    
    // Clear form fields
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type !== 'range') {
                input.value = '';
            }
        });
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    showScreen('welcome-screen');
    
    // Set up form submission handlers
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn--primary')) {
            const buttonText = e.target.textContent.toLowerCase();
            
            if (buttonText.includes('check-in')) {
                handleFormSubmission('checkin');
            } else if (buttonText.includes('goal')) {
                handleFormSubmission('goal');
            } else if (buttonText.includes('garden') || buttonText.includes('plant')) {
                handleFormSubmission('feedback');
            } else if (buttonText.includes('boost')) {
                handleFormSubmission('gratitude');
            } else if (buttonText.includes('send')) {
                handleFormSubmission('message');
            }
        }
        
        // Handle emergency fun button
        if (e.target.matches('.emergency-btn')) {
            const emergencyActivities = [
                "Send each other a selfie right now! 📸",
                "Have a 5-minute dance party together! 💃",
                "Play 20 questions via video call! ❓",
                "Send voice messages singing your favorite song! 🎵",
                "Share your current view out the window! 🪟"
            ];
            
            const randomActivity = emergencyActivities[Math.floor(Math.random() * emergencyActivities.length)];
            showAchievementNotification("🚨 Emergency Fun Activated!", randomActivity);
        }
    });
    
    // Update time zones every minute
    setInterval(updateTimeZones, 60000);
    
    // Initialize dashboard stats
    updateDashboardStats();
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle photo upload placeholder
    document.addEventListener('click', function(e) {
        if (e.target.closest('.photo-upload-area')) {
            showAchievementNotification("📷 Photo Upload", "Feature coming soon! For now, imagine your beautiful photo here! 💕");
        }
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Go back to dashboard on escape
            if (appState.currentModule !== 'dashboard') {
                showDashboard();
            }
        }
    });
    
    // Initialize communication center time update
    updateTimeZones();
});

// Expose global functions for HTML onclick handlers
window.showWelcome = showWelcome;
window.showProfileSetup = showProfileSetup;
window.showLogin = showLogin;
window.showDashboard = showDashboard;
window.showModule = showModule;
window.completeProfiling = completeProfiling;
window.showGoalTab = showGoalTab;
window.showActivityCategory = showActivityCategory;
window.showFeedbackTab = showFeedbackTab;
window.spinWheel = spinWheel;

// Add some fun interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to module cards
    document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add celebration animation for achievements
    let achievementCount = 0;
    
    function checkAchievements() {
        if (appState.streakCount >= 7 && achievementCount < 1) {
            setTimeout(() => {
                showAchievementNotification("🔥 Achievement Unlocked!", "Week Strong - 7 day streak!");
                achievementCount++;
            }, 5000);
        }
    }
    
    // Check achievements periodically
    setInterval(checkAchievements, 10000);
    
    // Add some personality to the app
    const loveMessages = [
        "Distance means nothing when you mean everything 💕",
        "Love knows no distance 💖",
        "Together in heart, no matter how far apart 💓",
        "Your love is worth the wait 💗",
        "Making memories across the miles 📸"
    ];
    
    // Show a random love message every few minutes
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance
            const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            showAchievementNotification("💕 Love Reminder", randomMessage);
        }
    }, 120000); // Every 2 minutes
});