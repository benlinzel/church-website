import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET!,
  },
  // the hosted Studio at wgc-cms.sanity.studio, so `sanity deploy` doesn't ask
  deployment: {
    appId: 'd8a13a24109b93782f9157db',
  },
})
