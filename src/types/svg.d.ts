/* svg 변환 에러방지 코드 */

declare module "*.svg" {
  import React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
