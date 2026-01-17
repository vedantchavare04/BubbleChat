import * as React from "react";
interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
    reverse?: boolean;
    pauseOnHover?: boolean;
    vertical?: boolean;
}
export default function Marquee({ className, reverse, pauseOnHover, vertical, ...props }: MarqueeProps): React.JSX.Element;
export {};
//# sourceMappingURL=marquee.d.ts.map