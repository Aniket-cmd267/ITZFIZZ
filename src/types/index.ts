export interface MetricCardData {
  id: string;
  number: string;
  label: string;
  bgColor: string;
  textColor: string;
  positionDesktop: {
    top?: string;
    bottom?: string;
    right?: string;
    left?: string;
  };
}
