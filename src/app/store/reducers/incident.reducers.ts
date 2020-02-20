import { EIncidentActions, IncidentActions } from "../actions/incident.actions";
import { IncidentState, initialIncidentState } from "../state/incident.state";

export function incidentReducers( state: IncidentState = initialIncidentState,
                                  action: IncidentActions): IncidentState {
  switch (action.type) {
    case EIncidentActions.GetIncidentsSuccess: {
      return {
        ...state,
        incidents: action.payload,
        count: action.payload.length
      };
    }
    case EIncidentActions.GetIncidentSuccess: {
      return {
        ...state,
        selectedIncident: action.payload
      };
    }
    case EIncidentActions.CreateIncidentsSuccess: {
      return {
        ...state
      };
    }
    case EIncidentActions.UpdateIncidentSuccess: {
      state.incidents.forEach(incident => {
        if (incident._id === action.payload._id) {
          incident = {
            ...action.payload.data
          };
        }
      });
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }


}
