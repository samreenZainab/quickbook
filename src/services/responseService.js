// class ResponseService {
//   createResponse(status, message) {
//     let responseObj

//     if (status === "SUCCESS") {
//       responseObj = {
//         status: status,
//         responseCode: "200",
//         message: message
//       }
//     } else if (status === "FAILURE") {
//       responseObj = {
//         status: status,
//         message: message,
//         responseCode: "400"
//       }
//     } else if (status === "SERVER_ERROR") {
//       responseObj = {
//         status: status,
//         message: message,
//         responseCode: "500"
//       }
//     } else if (status === "PARTIAL_CONTENT") {
//       responseObj = {
//         metadata: {
//           status: status,
//           message: message,
//           responseCode: "206"
//         }
//       }
//     }

//     return responseObj
//   }

//   createErrorResponse(responseData) {}
//   createExceptionResponse(responseData) {}
// }

// module.exports = new ResponseService()
