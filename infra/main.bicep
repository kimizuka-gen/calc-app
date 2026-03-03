// Azure Static Web Apps (Standard Plan) for Calc App
// Region: East Asia (docs/nonrequirements.md L25)
// Resource Group: rg-kimizuka-githubcopilot-handson (pre-created)

param location string = 'eastasia'
param staticWebAppName string = 'kimizuka-githubcopilot-handson'

resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: staticWebAppName
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    buildProperties: {
      appLocation: '/'
      outputLocation: 'dist'
      apiLocation: ''
    }
  }
  tags: {
    environment: 'production'
    project: 'calc-app'
  }
}

output staticWebAppId string = staticWebApp.id
output defaultHostname string = staticWebApp.properties.defaultHostname
