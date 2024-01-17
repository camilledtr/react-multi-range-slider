import styled from '@emotion/styled'

export const SliderWrapper = styled.div<{ height: number }>`
  width: 90%;
  height: ${({ height }) => height}px;
  display: flex;
  position: relative;
  padding: 20px 0px;
  flex-direction: column;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const Bar = styled.div`
  display: flex;
  height: 100%;
  border-radius: 10px;
`

export const BarSegment = styled.div<{ width: string; color: string }>`
  width: ${({ width }) => width};
  background-color: ${({ color }) => color};
  padding-top: 2px;
  position: relative;
  border-radius: 10px;
`

export const RangeInput = styled.input`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  opacity: 0;
  pointer-events: none;
`

export const Thumb = styled.div<{ width: number, height: number, color: string, barHeight: number }>`
  background-color: white;
  position: relative;
  z-index: 1;
  cursor: col-resize;

  &:before {
    content: '';
    background-color: inherit;
    position: absolute;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
    z-index: 1;
    ${({ width, height, barHeight }) => `
      margin: -${(height - barHeight) / 2}px -${width / 2}px;
    `}
    cursor: col-resize;
  }
`

export const Caption = styled.div<{ barHeight: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: ${({ barHeight }) => barHeight * 5}px;
  position: absolute;
  z-index: 0;
  top: -${({ barHeight }) => barHeight * 1.8}px;
  left: 50%;
  transform: translateX(-50%);
`

export const Text = styled.div<{ bold?: boolean }>`
  justidy-self: flex-end;
  margin: 0;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  color: black;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`
