"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var LoadingSpinnerComponent_1 = require("./loadingspinner/LoadingSpinnerComponent");
require("./Wrapper.css");
var logo = require('./logo.svg');
var Wrapper = /** @class */ (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wrapper.prototype.render = function () {
        if (this.props.loading) {
            return (<LoadingSpinnerComponent_1.LoadingSpinnerComponent />);
        }
        return (<div className="wrapper">
                <div className="wrapper__header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>
                <div className="container">
                    {this.props.children}
                </div>
            </div>);
    };
    return Wrapper;
}(React.Component));
exports.default = Wrapper;
