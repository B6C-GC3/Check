export interface LineChartDtos{
    xAxisId: number;
    yAxisId: number;
    connectNulls: boolean;
    activeDot: boolean;
    dot: boolean;
    legendType: string;
    stroke: string;
    strokeWidth: number;
    fill: string;
    isAnimationActive: boolean;
    animateNewValues: boolean;
    animationBegin: number;
    animationDuration: number;
    animationEasing: string;
    hide: boolean;
}