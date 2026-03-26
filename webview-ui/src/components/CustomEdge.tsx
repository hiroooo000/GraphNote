import { BaseEdge, EdgeProps, getBezierPath, Position } from '@xyflow/react';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  animated
}: EdgeProps) {
  let edgePath = '';

  // 同じ側同士の接続の場合、強制的に外側へ膨らむC字カーブを描画する (offsetを50に調整)
  if (sourcePosition === Position.Right && targetPosition === Position.Right) {
    const offset = Math.max(50, Math.abs(targetY - sourceY) * 0.5);
    const controlX = Math.max(sourceX, targetX) + offset;
    edgePath = `M ${sourceX},${sourceY} C ${controlX},${sourceY} ${controlX},${targetY} ${targetX},${targetY}`;
  } else if (sourcePosition === Position.Left && targetPosition === Position.Left) {
    const offset = Math.max(50, Math.abs(targetY - sourceY) * 0.5);
    const controlX = Math.min(sourceX, targetX) - offset;
    edgePath = `M ${sourceX},${sourceY} C ${controlX},${sourceY} ${controlX},${targetY} ${targetX},${targetY}`;
  } else if (sourcePosition === Position.Top && targetPosition === Position.Top) {
    const offset = Math.max(50, Math.abs(targetX - sourceX) * 0.5);
    const controlY = Math.min(sourceY, targetY) - offset;
    edgePath = `M ${sourceX},${sourceY} C ${sourceX},${controlY} ${targetX},${controlY} ${targetX},${targetY}`;
  } else if (sourcePosition === Position.Bottom && targetPosition === Position.Bottom) {
    const offset = Math.max(50, Math.abs(targetX - sourceX) * 0.5);
    const controlY = Math.max(sourceY, targetY) + offset;
    edgePath = `M ${sourceX},${sourceY} C ${sourceX},${controlY} ${targetX},${controlY} ${targetX},${targetY}`;
  } else {
    // それ以外（通常）の接続はデフォルトのBezier
    [edgePath] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      curvature: 0.5,
    });
  }

  // animatedプロパティがtrueの場合、標準のアニメーション用クラスを付与
  const edgeClasses = `react-flow__edge-path ${animated ? 'animated' : ''}`;

  return (
    <BaseEdge 
      id={id} 
      path={edgePath} 
      markerEnd={markerEnd} 
      style={style} 
      className={edgeClasses}
    />
  );
}
