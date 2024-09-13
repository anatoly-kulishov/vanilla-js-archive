import { Api } from 'api/types';
import MonitoringWebSocket from './MonitoringWebSocket';
import { getAuthToken } from 'helpers/authToken';

const WS_DOCUMENT_SERVICE = process.env.WS_DOCUMENT_SERVICE;

type GetDocumentByWsArgs = {
  requestId: string;
  title: string;
  sockets: WebSocket[];
};

type GetDocumentByWs = (args: GetDocumentByWsArgs) => Promise<Api.DocumentService.Model.Document>;

export const getDocumentByWs: GetDocumentByWs = ({ requestId, title, sockets }) => {
  if (!requestId) {
    return Promise.reject(new Error());
  }

  return new Promise((resolve, reject) => {
    const token = getAuthToken().split(' ')[1];
    const socket = new WebSocket(`${WS_DOCUMENT_SERVICE}/api/v1/Documents/${requestId}`, [
      'client',
      token
    ]);

    const stopConnection = () => {
      monitoring.stop();
      socket.close();
      reject(new Error());
    };

    const monitoring = new MonitoringWebSocket({
      socket,
      handleMonitoringError: stopConnection
    });

    if (sockets) {
      sockets.push(socket);
    }

    socket.onopen = () => {
      monitoring.start();
    };

    socket.addEventListener('message', (event) => {
      const responseBody = JSON.parse(event.data);

      const document = {
        title,
        ...responseBody
      };
      resolve(document);
    });

    socket.onerror = stopConnection;

    socket.onclose = stopConnection;
  });
};
