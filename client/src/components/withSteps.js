import { withStateHandlers } from 'recompose'

export default withStateHandlers(
  ({ initialStep = 0 }) => ({
    step: initialStep,
  }),
  {
    nextStep: ({ step }, { maxSteps = Number.MAX_SAFE_INTEGER }) => () => ({
      step: Math.min(step + 1, maxSteps),
    }),
    prevStep: ({ step }) => () => ({
      step: Math.max(step - 1, 0),
    }),
  },
)
