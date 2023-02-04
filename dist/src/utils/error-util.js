"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
// return "stringify" error
function getErrorMessage(error) {
    let errMessage;
    if (error instanceof Error)
        errMessage = error.message; //return { error: error.message };
    errMessage = String(error);
    return { error: errMessage };
}
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=error-util.js.map