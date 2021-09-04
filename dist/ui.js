"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const swr_1 = __importDefault(require("swr"));
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const ink_link_1 = __importDefault(require("ink-link"));
const pageUrls = {
    roblex: "https://roblex.pe/",
    rextie: "https://www.rextie.com/",
    tkambio: "https://tkambio.com/",
    decamoney: "https://decamoney.com/",
    kambista: "https://kambista.com/",
};
const Item = ({ name, buy, sell, isFirst }) => (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
    react_1.default.createElement(ink_link_1.default, { url: pageUrls[name] },
        react_1.default.createElement(ink_1.Text, { color: "red" }, name)),
    react_1.default.createElement(ink_1.Box, { flexDirection: "column", marginLeft: 2 },
        react_1.default.createElement(ink_1.Box, { justifyContent: "flex-start" },
            react_1.default.createElement(ink_1.Text, { color: "blue" }, "buy: "),
            react_1.default.createElement(ink_1.Text, { color: isFirst ? "green" : "white" }, buy)),
        react_1.default.createElement(ink_1.Box, null,
            react_1.default.createElement(ink_1.Text, { color: "blue" }, "sell: "),
            react_1.default.createElement(ink_1.Text, { color: isFirst ? "green" : "white" }, sell)))));
const fetcher = (url) => (0, isomorphic_fetch_1.default)(url).then((res) => res.json());
const App = () => {
    const { data } = (0, swr_1.default)("https://dollarpe-site.vercel.app/api", fetcher, { suspense: true });
    return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" }, data === null || data === void 0 ? void 0 : data.map(([name, { buy, sell }], index) => (react_1.default.createElement(Item, { key: name, name: name, buy: buy, sell: sell, isFirst: index === 0 })))));
};
// module.exports = App;
exports.default = App;
