import { UnitStateEnum } from "../enum/UnitStateEnum";
import { ModuleViewModel } from "./ModuleViewModel";

export interface UnitViewModel {
    id: string;
    code: string;
    state: UnitStateEnum;
    modules: ModuleViewModel[];
}
