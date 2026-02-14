"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GodownDiaryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const godown_diary_controller_1 = require("./godown-diary.controller");
const godown_diary_service_1 = require("./godown-diary.service");
const godown_diary_entity_1 = require("./godown-diary.entity");
let GodownDiaryModule = class GodownDiaryModule {
};
exports.GodownDiaryModule = GodownDiaryModule;
exports.GodownDiaryModule = GodownDiaryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([godown_diary_entity_1.GodownDiary])],
        controllers: [godown_diary_controller_1.GodownDiaryController],
        providers: [godown_diary_service_1.GodownDiaryService],
        exports: [godown_diary_service_1.GodownDiaryService],
    })
], GodownDiaryModule);
//# sourceMappingURL=godown-diary.module.js.map