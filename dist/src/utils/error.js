"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
// return "stringify" error
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    console.log(",,...strigify error.....");
    return String(error);
}
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=error.js.map