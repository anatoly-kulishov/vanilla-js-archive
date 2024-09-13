// Selectors for getting diagnostic context
export const getHandlingData = state => state.diagnosticManager.diagnosticManager.HandlingData
export const getScenarioData = state => state.diagnosticManager.diagnosticManager.ScenarioData
export const getStepData = state => state.diagnosticManager.diagnosticManager.StepData
// Selectors for creating diagnostic context
export const createHandlingData = state => {
  const {
    mnp: {
      mnpMarkersState: {
        mnpMarkers
      }
    },
    personalInfo: {
      personalAccountState: {
        personalAccount: {
          ClientId,
          BillingBranchId,
          ClientCategory,
          ClientCategoryId,
          ClientStatusId,
          SubscriberId,
          SubscriberTypeId,
          PersonalAccountId,
          SubscriberStatus: SubscriberStatusId,
          Msisdn,
          Email,
          SubscriberFullInfo: {
            SubscriberClientInfo: { Region }
          },
          BaseFunctionalParams: { AppMode }
        }
      }
    },
    internal: {
      processingParametersState: {
        processingParameters: {
          HandlingBranchId,
          InteractionDirection: { Id: InteractionDirectionId },
          ServiceChannel: { Id: ServiceChannelId }
        }
      },
      queryParamsState: {
        queryParams: { handlingTechId: HandlingTechId }
      },
      handlingState: { Id: HandlingId },
      userState: { user }
    }
  } = state

  return {
    ClientId,
    ClientCategory,
    ClientBranchId: BillingBranchId,
    ClientCategoryId,
    ClientStatusId,
    SubscriberId,
    SubscriberBranchId: BillingBranchId,
    SubscriberTypeId,
    SubscriberStatusId,
    HandlingId,
    HandlingTechId,
    Msisdn,
    Email,
    ServiceChannelId,
    InteractionDirectionId,
    HandlingBranchId,
    PersonalAccountId,
    Region,
    IsAnonymous: AppMode === 'anonymous',
    FunctionalRole: user.Permissions.filter(permission => permission.includes('CCFR:')),
    PayPackPersonalAccountId: mnpMarkers?.PayPackPersonalAccount
  }
}
export const createScenarioData = (state, selectedScenarioId) => {
  const {
    diagnosticManager: {
      diagnosticScenario: { diagnosticScenarios }
    }
  } = state

  return diagnosticScenarios.find(scenario => scenario.ScenarioId === selectedScenarioId)
}
