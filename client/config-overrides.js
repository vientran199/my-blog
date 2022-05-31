//Tùy chỉnh cấu hình webpack để nạp bablerc, vì webpack nó không tự nộp vào
const { override, useBabelRc } = require("customize-cra");

module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc()
);