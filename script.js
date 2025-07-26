document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const videoTopicInput = document.getElementById('video-topic');
    const generateBtn = document.getElementById('generate-btn');
    const resultsContainer = document.getElementById('results-container');
    const notification = document.getElementById('notification');
    const exampleTags = document.querySelectorAll('.example-tag');
    const analyzeText = document.getElementById('analyze-text');
    const analyzeBtn = document.getElementById('analyze-btn');
    const analysisResults = document.getElementById('analysis-results');
    
    // Thumbnail templates
    const thumbnailTemplates = [
        // Question/Problem templates
        "HOW TO {{topic}} in 2024!",
        "WHY {{topic}} is CHANGING Everything",
        "{{topic}} SECRET REVEALED!",
        "WHY {{topic}} is SO Hard to Master",
        "{{topic}} MISTAKES You're Making",
        
        // Number-based templates
        "5 {{topic}} TIPS That Actually Work",
        "7 {{topic}} HACKS No One Tells You",
        "10 {{topic}} IDEAS That Will Go VIRAL",
        "3 {{topic}} MISTAKES KILLING Your Growth",
        "15 {{topic}} TRICKS Professionals Use",
        
        // Emotional/Reaction templates
        "{{topic}} SHOCKED Me! Here's Why",
        "I Tried {{topic}} for 30 Days...",
        "{{topic}} Made Me $_____ in ONE Day!",
        "The TRUTH About {{topic}} No One Tells You",
        "{{topic}} Will BLOW Your Mind!",
        
        // Authority/Expert templates
        "{{topic}} EXPERT Reveals Secrets",
        "PRO {{topic}} Techniques You Need",
        "INSIDER {{topic}} STRATEGY Works Every Time",
        "{{topic}} PROFESSIONALS Don't Want You to Know",
        "{{topic}} MASTERED in 30 Minutes or Less",
        
        // Controversial/Debatable templates
        "{{topic}} is LYING to You!",
        "Why {{topic}} is OVERrated!",
        "{{topic}} EXPOSED: The TRUTH Behind It",
        "STOP Doing {{topic}} This Way!",
        "{{topic}} is BROKEN - Here's Why",
        
        // Tutorial/How-to templates
        "{{topic}} STEP-BY-STEP Tutorial",
        "COMPLETE {{topic}} GUIDE for Beginners",
        "{{topic}} TUTORIAL That Actually Works",
        "EASY {{topic}} SETUP in 5 Minutes",
        "{{topic}} FOR DUMMIES (It's Easy!)",
        
        // Comparison/Review templates
        "{{topic}} VS {{alternative}} - Which is BETTER?",
        "TOP 5 {{topic}} Tools Reviewed",
        "{{topic}} COMPARED: Free vs Paid",
        "BEST {{topic}} of 2024 - My Honest Review",
        "{{topic}} RANKED: From WORST to BEST",
        
        // Time-sensitive templates
        "{{topic}} TRENDS for 2024",
        "NEW {{topic}} You NEED to Know",
        "{{topic}} is DYING - What Replaced It?",
        "FUTURE of {{topic}} is HERE",
        "{{topic}} EVOLUTION: Where It's Heading"
    ];
    
    // Alternative topics for comparisons
    const alternativeTopics = [
        "AI Tools", "Manual Methods", "Old School", "Competitor Brand", 
        "Free Version", "Paid Version", "Beginner Approach", "Expert Method"
    ];
    
    // Generate thumbnail ideas
    function generateThumbnailIdeas() {
        const topic = videoTopicInput.value.trim();
        
        if (!topic) {
            showNotification('Please enter a video topic first!');
            videoTopicInput.focus();
            return;
        }
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Generate 12 unique thumbnail ideas
        const ideas = [];
        const usedTemplates = new Set();
        
        while (ideas.length < 12 && ideas.length < thumbnailTemplates.length) {
            // Get random template
            const randomIndex = Math.floor(Math.random() * thumbnailTemplates.length);
            const template = thumbnailTemplates[randomIndex];
            
            // Avoid duplicates
            if (usedTemplates.has(randomIndex)) continue;
            usedTemplates.add(randomIndex);
            
            // Process template
            let idea = template.replace(/{{topic}}/g, topic.toUpperCase());
            
            // Handle alternatives in comparison templates
            if (idea.includes('{{alternative}}')) {
                const randomAlt = alternativeTopics[Math.floor(Math.random() * alternativeTopics.length)];
                idea = idea.replace('{{alternative}}', randomAlt);
            }
            
            ideas.push(idea);
        }
        
        // Create HTML for results
        const grid = document.createElement('div');
        grid.className = 'thumbnail-ideas-grid';
        
        ideas.forEach((idea, index) => {
            const card = document.createElement('div');
            card.className = 'thumbnail-card';
            card.innerHTML = `
                <div class="thumbnail-text">${idea}</div>
                <button class="copy-button" data-text="${idea}">Copy Text</button>
            `;
            grid.appendChild(card);
        });
        
        resultsContainer.appendChild(grid);
        
        // Add event listeners to copy buttons
        document.querySelectorAll('.copy-button').forEach(button => {
            button.addEventListener('click', function() {
                const text = this.getAttribute('data-text');
                copyToClipboard(text, this);
            });
        });
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Copy to clipboard function
    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            // Show copied feedback
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.classList.add('copied');
            
            // Show notification
            showNotification('Thumbnail idea copied to clipboard!');
            
            // Reset button after delay
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showNotification('Failed to copy. Please try again.');
        });
    }
    
    // Show notification
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Thumbnail Analyzer Function
    function analyzeThumbnail(text) {
        if (!text.trim()) {
            showNotification('Please enter thumbnail text to analyze!');
            analyzeText.focus();
            return;
        }
        
        const results = {
            score: 0,
            feedback: [],
            maxScore: 100
        };
        
        // Check for numbers (increases CTR by 36%)
        if (/\d/.test(text)) {
            results.score += 20;
            results.feedback.push({
                text: "✅ Contains numbers (increases click-through rate by 36%)",
                type: "good"
            });
        } else {
            results.feedback.push({
                text: "❌ Add numbers for better performance (e.g., '5 Tips', '10 Secrets')",
                type: "improvement"
            });
        }
        
        // Check for uppercase/emphasis words
        const uppercaseWords = text.match(/[A-Z]{4,}/g) || [];
        if (uppercaseWords.length > 0) {
            results.score += 15;
            results.feedback.push({
                text: "✅ Uses uppercase for emphasis (great for visibility)",
                type: "good"
            });
        } else {
            results.feedback.push({
                text: "💡 Use ALL CAPS for key words to make them stand out",
                type: "improvement"
            });
        }
        
        // Check length (ideal: 40-60 characters)
        if (text.length >= 40 && text.length <= 60) {
            results.score += 25;
            results.feedback.push({
                text: "✅ Optimal text length for readability",
                type: "good"
            });
        } else if (text.length < 40) {
            results.feedback.push({
                text: "💡 Text might be too short - add more compelling details",
                type: "improvement"
            });
        } else {
            results.feedback.push({
                text: "💡 Text might be too long - simplify for better readability",
                type: "improvement"
            });
        }
        
        // Check for emotional words
        const emotionalWords = ['SHOCKED', 'SECRET', 'REVEALED', 'BROKE', 'INSANE', 'AMAZING', 'UNBELIEVABLE', 'CRAZY', 'WOW', 'MIND-BLOWING'];
        const hasEmotional = emotionalWords.some(word => text.includes(word));
        if (hasEmotional) {
            results.score += 20;
            results.feedback.push({
                text: "✅ Contains emotional trigger words (great for engagement)",
                type: "good"
            });
        } else {
            results.feedback.push({
                text: "💡 Add emotional trigger words (SHOCKED, SECRET, CRAZY, etc.)",
                type: "improvement"
            });
        }
        
        // Check for question marks or exclamation
        if (/[!?]/.test(text)) {
            results.score += 20;
            results.feedback.push({
                text: "✅ Uses punctuation for engagement",
                type: "good"
            });
        } else {
            results.feedback.push({
                text: "❓ Add ? or ! for more engagement (e.g., 'You Won't Believe This!')",
                type: "improvement"
            });
        }
        
        // Display results
        displayAnalysisResults(results);
    }
    
    // Display analysis results
    function displayAnalysisResults(results) {
        let feedbackHTML = '';
        
        results.feedback.forEach(item => {
            feedbackHTML += `
                <div class="feedback-item ${item.type}">
                    ${item.text}
                </div>
            `;
        });
        
        analysisResults.innerHTML = `
            <div class="analysis-score">Score: ${results.score}/${results.maxScore}</div>
            <div class="analysis-feedback">
                <h4>Analysis Results:</h4>
                ${feedbackHTML}
            </div>
            <div class="analysis-summary">
                <h4>Summary:</h4>
                <p>${getScoreSummary(results.score)}</p>
            </div>
        `;
        
        // Scroll to analysis results
        analysisResults.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Get score summary
    function getScoreSummary(score) {
        if (score >= 80) {
            return "Excellent! This thumbnail has strong potential for high click-through rates.";
        } else if (score >= 60) {
            return "Good start! With a few improvements, this could be a high-performing thumbnail.";
        } else if (score >= 40) {
            return "Needs work. Focus on the suggested improvements to boost performance.";
        } else {
            return "Significant improvements needed. Follow the suggestions to create a more compelling thumbnail.";
        }
    }
    
    // Event Listeners
    generateBtn.addEventListener('click', generateThumbnailIdeas);
    
    // Enter key support for topic input
    videoTopicInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateThumbnailIdeas();
        }
    });
    
    // Enter key support for analyzer
    analyzeText.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            analyzeThumbnail(analyzeText.value);
        }
    });
    
    // Analyze button
    analyzeBtn.addEventListener('click', function() {
        analyzeThumbnail(analyzeText.value);
    });
    
    // Example tag click handlers
    exampleTags.forEach(tag => {
        tag.addEventListener('click', function() {
            videoTopicInput.value = this.textContent;
            videoTopicInput.focus();
            generateThumbnailIdeas();
        });
    });
    
    // Initialize with a sample
    videoTopicInput.value = 'How to start a YouTube channel';
});
