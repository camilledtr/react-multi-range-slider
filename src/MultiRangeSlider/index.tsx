import React, { CSSProperties, ChangeEvent, MutableRefObject } from 'react'

import {
  Bar,
  BarSegment,
  Caption,
  RangeInput,
  SliderWrapper,
  Thumb,
  Text
} from './styles'

type MultiRangeSliderProps = {
  values: number[]
  labels?: string[]
  unit?: string
  min?: number
  max?: number
  step?: number
  onChange: (newValues: number[]) => void
  ref?: MutableRefObject<HTMLDivElement | null>
  color?: string
  secondaryColor?: string
  barHeight?: number
  thumbWidth?: number
  thumbHeight?: number
  thumbColor?: string
  thumbStyle?: CSSProperties
  containerStyle?: CSSProperties
}

const MultiRangeSlider = (props: MultiRangeSliderProps) => {
  const {
    values,
    labels = [],
    unit = '',
    min = 0,
    max = 100,
    step = 1,
    onChange,
    ref,
    color = '#142a4c80',
    secondaryColor,
    barHeight = 12,
    thumbWidth = 30,
    thumbHeight = 30,
    thumbColor = 'black',
    thumbStyle,
    containerStyle
  } = props

  const getNewValues = (prevValues: number[], index: number, value: number) => {
    const newValues = [...prevValues]
    newValues[index] = value

    if (index < newValues.length - 1) {
      const currentPositon =
        value + values.slice(0, index).reduce((acc, cur) => acc + cur, 0)
      const nextPosition = values
        .slice(0, index + 2)
        .reduce((acc, cur) => acc + cur, 0)

      if (currentPositon >= nextPosition) {
        if (index === 0) {
          newValues[index] = nextPosition
        } else if (index === newValues.length - 2) {
          newValues[index] =
            100 - values.slice(0, index).reduce((acc, cur) => acc + cur, 0)
        } else {
          newValues[index] = nextPosition - values[index - 1]
        }
      }
      const diff = newValues[index] - values[index]
      newValues[index + 1] = values[index + 1] - diff
    } else {
      const diff = newValues[index] - values[index]
      const lastIndex = newValues.length - 1
      newValues[lastIndex] = values[lastIndex] + diff
    }

    return newValues
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const currentValue = parseFloat(e.target.value)
    const newValues = getNewValues(values, index, currentValue)

    onChange(newValues)
  }

  const onThumbMousedown = (index: number) => (e: React.MouseEvent) => {
    const startX = e.clientX
    const thumb = e.target as HTMLDivElement
    const bar = thumb.parentNode as HTMLDivElement
    const barBox = bar.getBoundingClientRect()
    const barValue = values[index]

    const onThumbMousemove = createThumbMousemoveHandler(
      index,
      startX,
      barBox,
      barValue,
      step
    )
    const onThumbMouseup = createThumbMouseupHandler(onThumbMousemove)

    document.addEventListener('mousemove', onThumbMousemove)
    document.addEventListener('mouseup', onThumbMouseup)
  }

  const createThumbMousemoveHandler =
    (index: number, startX: number, barBox: DOMRect, barValue: number, step: number) =>
    (e: MouseEvent) => {
      const clientX = e.clientX
      const dx = clientX - startX
      const per = dx / barBox.width
      let val = Math.round(barValue + step * Math.round(max * per / step))

      const nextValue = values[index + 1]

      if (val < min) {
        val = min
      } else if (val > max) {
        val = max
      }

      if (nextValue !== undefined) {
        const newNextValue = nextValue - (val - barValue)
        if (newNextValue > max) {
          val = barValue + nextValue - max
        } else if (newNextValue < min) {
          val = barValue + nextValue - min
        }
      }

      onChange(getNewValues(values, index, val))
    }

  const createThumbMouseupHandler =
    (onThumbMousemove: (e: MouseEvent) => void) => () => {
      document.removeEventListener('mousemove', onThumbMousemove)
    }

  return (
    <SliderWrapper ref={ref} style={containerStyle} height={barHeight}>
      <Bar>
        {values.map((value, index) => (
          <React.Fragment key={index}>
            <BarSegment
              width={`${value}%`}
              color={index % 2 === 0 ? color : secondaryColor ?? color}
            >
              <Caption barHeight={barHeight}>
                <Text>{labels[index] ?? ''}</Text>
                <Text bold>
                  {`${value} ${unit}`}
                </Text>
              </Caption>
            </BarSegment>
            <RangeInput
              placeholder={`value ${index + 1}`}
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onInputChange(e, index)
              }}
            />
            {index < values.length - 1 && (
              <Thumb
                style={thumbStyle}
                width={thumbWidth}
                height={thumbHeight}
                color={thumbColor}
                barHeight={barHeight}
                onMouseDown={onThumbMousedown(index)}
              />
            )}
          </React.Fragment>
        ))}
      </Bar>
    </SliderWrapper>
  )
}

export default MultiRangeSlider
