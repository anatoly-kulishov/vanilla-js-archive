/** ************************************************************************ */
// XmlHttpRequest
// идемпотентные методы запросов
// безопасные не безопасные, сложные простые
// put patch
// get post : body, идемпотн, кешируемость, сложный post, безопасность
// websocket, short polling, long polling, SSE(server sent events)
// long polling, кешируемость запросов, метро запрос до и после не
// abortController
/** ************************************************************************ */
// SOP(same origin policy) -> CORS, preflight, сложные простые
// К распространенным методам HTTP относятся GET, POST, PUT и DELETE.

// При обычном обмене ресурсами между источниками (CORS) браузер отправляет запрос вместе с заголовками управления доступом.
// Обычно это запросы данных GET, которые считаются низкорисковыми.

// Однако некоторые HTTP-запросы считаются сложными и требуют подтверждения со стороны сервера перед отправкой фактического запроса.
// Процесс предварительного утверждения называется предварительным запросом.
/** ************************************************************************ */
// worker
// sync // while (true)
// event {
//   micro all // promise return promise callback then catch finally, queueMicrotask, observers(MutationObserver)
//   render (rAF, rIC, repaint reflow recompose)
//   macro (BOM fetch dom timeout....)
// }