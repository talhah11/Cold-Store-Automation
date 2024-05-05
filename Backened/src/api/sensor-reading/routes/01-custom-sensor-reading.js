module.exports = {
  routes: [
    { 
      method: 'POST',
      path: '/sensor-readings/send-email', 
      handler: 'sensor-reading.sendEmail',
    }
  ]
}