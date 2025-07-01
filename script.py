# Create the complete HTML structure for the bleb app
html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>💕 bleb - Bringing hearts closer</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app-container">
        <!-- Header -->
        <header class="app-header">
            <h1>💕 bleb</h1>
            <p class="tagline">Bringing hearts closer, no matter the distance</p>
            <div class="time-display">
                <span id="current-time"></span> GMT
            </div>
        </header>

        <!-- Navigation -->
        <nav class="nav-tabs">
            <button class="nav-btn active" data-tab="checkin">📸 Daily</button>
            <button class="nav-btn" data-tab="goals">🎯 Goals</button>
            <button class="nav-btn" data-tab="activities">🎲 Activities</button>
            <button class="nav-btn" data-tab="feedback">💌 Feedback</button>
            <button class="nav-btn" data-tab="memories">📚 Memories</button>
            <button class="nav-btn" data-tab="communication">💬 Chat</button>
        </nav>

        <!-- Main Content -->
        <main class="main-content">
            
            <!-- Daily Check-in Tab -->
            <div id="checkin" class="tab-content active">
                <h2>📸 Daily Check-in</h2>
                
                <div class="streak-counter">
                    <div class="streak-display">
                        <span class="streak-number" id="streak-count">0</span>
                        <span class="streak-label">Day Streak! 🔥</span>
                    </div>
                </div>

                <div class="photo-upload-section">
                    <h3>📷 Share Your Day</h3>
                    <div class="upload-area" id="photo-upload">
                        <input type="file" id="photo-input" accept="image/*" style="display: none;">
                        <div class="upload-placeholder">
                            <span class="upload-icon">📷</span>
                            <p>Click to add today's photo</p>
                        </div>
                    </div>
                    <div id="photo-preview" class="photo-preview" style="display: none;">
                        <img id="preview-image" src="" alt="Today's photo">
                        <button id="remove-photo" class="remove-btn">❌</button>
                    </div>
                </div>

                <div class="mood-section">
                    <h3>😊 How are you feeling?</h3>
                    <div class="mood-selector">
                        <button class="mood-btn" data-mood="😢" data-value="1">😢 Sad</button>
                        <button class="mood-btn" data-mood="😐" data-value="2">😐 Neutral</button>
                        <button class="mood-btn" data-mood="😊" data-value="3">😊 Happy</button>
                        <button class="mood-btn" data-mood="😍" data-value="4">😍 Great</button>
                        <button class="mood-btn" data-mood="🥰" data-value="5">🥰 Amazing</button>
                    </div>
                    <div class="mood-note">
                        <textarea id="mood-note" placeholder="Add a note about your day..." maxlength="200"></textarea>
                        <div class="char-count"><span id="char-count">0</span>/200</div>
                    </div>
                </div>

                <button id="save-checkin" class="action-btn">💾 Save Check-in</button>

                <div class="recent-checkins">
                    <h3>🗓️ Recent Check-ins</h3>
                    <div id="checkin-history" class="checkin-grid"></div>
                </div>
            </div>

            <!-- Goals & Growth Tab -->
            <div id="goals" class="tab-content">
                <h2>🎯 Goals & Growth</h2>
                
                <div class="goal-creation">
                    <h3>✨ Create New Goal</h3>
                    <div class="goal-form">
                        <input type="text" id="goal-title" placeholder="Goal title..." maxlength="50">
                        <textarea id="goal-description" placeholder="Describe your goal..." maxlength="200"></textarea>
                        <div class="goal-type">
                            <label>
                                <input type="radio" name="goal-type" value="personal" checked> 
                                👤 Personal Goal
                            </label>
                            <label>
                                <input type="radio" name="goal-type" value="couple"> 
                                💕 Couple Goal
                            </label>
                        </div>
                        <div class="goal-target">
                            <label>Target:</label>
                            <input type="number" id="goal-target" min="1" max="365" value="30">
                            <span>days</span>
                        </div>
                        <button id="create-goal" class="action-btn">🎯 Create Goal</button>
                    </div>
                </div>

                <div class="active-goals">
                    <h3>🏃‍♀️ Active Goals</h3>
                    <div id="goals-list" class="goals-grid"></div>
                </div>

                <div class="completed-goals">
                    <h3>✅ Completed Goals</h3>
                    <div id="completed-goals-list" class="goals-grid"></div>
                </div>
            </div>

            <!-- Activities Hub Tab -->
            <div id="activities" class="tab-content">
                <h2>🎲 Activities Hub</h2>
                
                <div class="activity-wheel-section">
                    <h3>🎡 Spin for an Activity!</h3>
                    <div class="wheel-container">
                        <div class="spin-wheel" id="spin-wheel">
                            <div class="wheel-pointer">📍</div>
                            <canvas id="wheel-canvas" width="300" height="300"></canvas>
                        </div>
                        <button id="spin-btn" class="spin-button">🎯 Spin the Wheel!</button>
                    </div>
                    <div id="activity-result" class="activity-result" style="display: none;">
                        <h4>🎉 Your Activity:</h4>
                        <p id="selected-activity"></p>
                        <button id="activity-done" class="action-btn">✅ Mark as Done</button>
                    </div>
                </div>

                <div class="activity-categories">
                    <h3>📋 Browse Activities</h3>
                    <div class="category-tabs">
                        <button class="category-btn active" data-category="virtual">💻 Virtual Dates</button>
                        <button class="category-btn" data-category="games">🎮 Games</button>
                        <button class="category-btn" data-category="creative">🎨 Creative</button>
                        <button class="category-btn" data-category="learning">📚 Learning</button>
                    </div>
                    <div id="activity-list" class="activity-list"></div>
                </div>

                <div class="custom-activities">
                    <h3>➕ Add Custom Activity</h3>
                    <div class="custom-form">
                        <input type="text" id="custom-activity" placeholder="Enter your activity idea...">
                        <select id="custom-category">
                            <option value="virtual">💻 Virtual Dates</option>
                            <option value="games">🎮 Games</option>
                            <option value="creative">🎨 Creative</option>
                            <option value="learning">📚 Learning</option>
                        </select>
                        <button id="add-activity" class="action-btn">➕ Add Activity</button>
                    </div>
                </div>
            </div>

            <!-- Feedback Garden Tab -->
            <div id="feedback" class="tab-content">
                <h2>💌 Feedback Garden</h2>
                
                <div class="feedback-types">
                    <button class="feedback-type-btn active" data-type="appreciation">💖 Appreciation</button>
                    <button class="feedback-type-btn" data-type="suggestion">💡 Suggestion</button>
                    <button class="feedback-type-btn" data-type="concern">💭 Concern</button>
                </div>

                <div class="feedback-form">
                    <h3 id="feedback-title">💖 Share an Appreciation</h3>
                    <textarea id="feedback-message" placeholder="I appreciate you because..." maxlength="500"></textarea>
                    <div class="feedback-options">
                        <label>
                            <input type="checkbox" id="anonymous-feedback"> 
                            🎭 Send anonymously
                        </label>
                    </div>
                    <button id="send-feedback" class="action-btn">💌 Send Feedback</button>
                </div>

                <div class="feedback-history">
                    <h3>📮 Feedback Exchange</h3>
                    <div class="feedback-filter">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="appreciation">💖</button>
                        <button class="filter-btn" data-filter="suggestion">💡</button>
                        <button class="filter-btn" data-filter="concern">💭</button>
                    </div>
                    <div id="feedback-list" class="feedback-list"></div>
                </div>
            </div>

            <!-- Memory Lane Tab -->
            <div id="memories" class="tab-content">
                <h2>📚 Memory Lane</h2>
                
                <div class="memory-stats">
                    <div class="stat-card">
                        <span class="stat-number" id="total-memories">0</span>
                        <span class="stat-label">Total Memories</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number" id="relationship-days">0</span>
                        <span class="stat-label">Days Together</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number" id="photos-shared">0</span>
                        <span class="stat-label">Photos Shared</span>
                    </div>
                </div>

                <div class="memory-creation">
                    <h3>✨ Create Memory</h3>
                    <div class="memory-form">
                        <input type="text" id="memory-title" placeholder="Memory title...">
                        <textarea id="memory-description" placeholder="Describe this memory..."></textarea>
                        <input type="date" id="memory-date">
                        <div class="memory-photo">
                            <input type="file" id="memory-photo-input" accept="image/*" style="display: none;">
                            <button id="add-memory-photo" class="upload-btn">📷 Add Photo</button>
                        </div>
                        <button id="save-memory" class="action-btn">💾 Save Memory</button>
                    </div>
                </div>

                <div class="memory-timeline">
                    <h3>🕒 Timeline</h3>
                    <div class="timeline-filter">
                        <button class="timeline-btn active" data-period="all">All Time</button>
                        <button class="timeline-btn" data-period="year">This Year</button>
                        <button class="timeline-btn" data-period="month">This Month</button>
                    </div>
                    <div id="memory-timeline" class="timeline-container"></div>
                </div>

                <div class="milestone-tracker">
                    <h3>🏆 Milestones</h3>
                    <div id="milestones" class="milestones-grid"></div>
                </div>
            </div>

            <!-- Communication Center Tab -->
            <div id="communication" class="tab-content">
                <h2>💬 Communication Center</h2>
                
                <div class="time-zones">
                    <div class="timezone-card">
                        <h4>🌍 Your Time Zone</h4>
                        <div class="time-display">
                            <span id="local-time"></span>
                            <span id="local-timezone"></span>
                        </div>
                    </div>
                    <div class="timezone-card">
                        <h4>💕 Partner's Time</h4>
                        <div class="time-display">
                            <span id="partner-time"></span>
                            <select id="partner-timezone">
                                <option value="GMT">GMT (London)</option>
                                <option value="EST">EST (New York)</option>
                                <option value="PST">PST (Los Angeles)</option>
                                <option value="JST">JST (Tokyo)</option>
                                <option value="IST">IST (India)</option>
                                <option value="CET">CET (Paris)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="quick-messages">
                    <h3>⚡ Quick Messages</h3>
                    <div class="quick-msg-grid">
                        <button class="quick-msg-btn" data-msg="Good morning, love! ☀️">☀️ Good Morning</button>
                        <button class="quick-msg-btn" data-msg="Thinking of you 💭💕">💭 Thinking of You</button>
                        <button class="quick-msg-btn" data-msg="Can't wait to see you! 🥰">🥰 Miss You</button>
                        <button class="quick-msg-btn" data-msg="Have a great day! 🌟">🌟 Great Day</button>
                        <button class="quick-msg-btn" data-msg="Sweet dreams 🌙💤">🌙 Good Night</button>
                        <button class="quick-msg-btn" data-msg="I love you so much! ❤️">❤️ Love You</button>
                    </div>
                </div>

                <div class="message-center">
                    <h3>💬 Messages</h3>
                    <div id="message-history" class="message-history"></div>
                    <div class="message-input">
                        <textarea id="new-message" placeholder="Type your message..." rows="3"></textarea>
                        <div class="message-actions">
                            <button id="send-message" class="action-btn">📤 Send</button>
                            <button id="voice-note" class="voice-btn">🎤 Voice Note</button>
                        </div>
                    </div>
                </div>

                <div class="call-scheduling">
                    <h3>📞 Schedule Call</h3>
                    <div class="schedule-form">
                        <input type="datetime-local" id="call-time">
                        <input type="text" id="call-topic" placeholder="Call topic (optional)">
                        <button id="schedule-call" class="action-btn">📅 Schedule Call</button>
                    </div>
                    <div id="scheduled-calls" class="scheduled-calls"></div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="app-footer">
            <p>Made with 💕 for long-distance love</p>
        </footer>
    </div>

    <!-- Success/Error Messages -->
    <div id="notification" class="notification"></div>

    <script src="app.js"></script>
</body>
</html>'''

# Save the HTML file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✅ Complete HTML structure created with all features!")
print("📁 File saved as: index.html")