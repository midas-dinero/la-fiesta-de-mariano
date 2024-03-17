import { Square } from "./Square";

export interface BoardData {
    name: string;
    filename: string;
    dice_sides: number;
    color_hex: string;
    squares: Square[];
}