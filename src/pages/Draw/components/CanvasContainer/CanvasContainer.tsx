import * as React from 'react';

import { PURPLE, YELLOW } from '../../../../utilities/styles/themeColors';

import Canvas from '../../../../components/Canvas';
import Card from '../../../../components/Card';

interface Props {
  width: number;
  height: number;
  setCanvasData(canvasData: any[]): void;
}

export default function CanvasContainer({
  width,
  height,
  setCanvasData
}: Props) {
  return (
    <Card>
      <Card.Section noPadding>
        <Canvas
          width={width}
          height={height}
          lineColor={YELLOW}
          backgroundColor={PURPLE}
          setCanvasData={setCanvasData}
        />
      </Card.Section>
    </Card>
  );
}
