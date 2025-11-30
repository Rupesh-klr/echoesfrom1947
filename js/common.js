// Configuration for the application
const AppConfig = {
    // Change this hostname to your production URL when deploying
    // Example: 'https://api.yourdomain.com/' or './' for local relative path
    hostname: './', 
    
    // Helper function to construct full URLs
    getDatabaseUrl: function() {
        return this.hostname + 'dbstore.json';
    }
};

// Exporting if using modules, or just global scope for simple inclusion
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppConfig;
}