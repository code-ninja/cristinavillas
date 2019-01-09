module.exports = {
  apps: [
    {
      name: "cristinavillas",
      script: "./node_modules/nuxt/bin/nuxt-start",
      env: {
        "HOST": "0.0.0.0",
        "PORT": 3100,
        "NODE_ENV": "production",
        "API_URL": "api.cristinavillasresort.com"
      }
    }
  ]
}
