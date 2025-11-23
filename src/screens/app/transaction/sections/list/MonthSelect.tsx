import { Button, IconButton } from '@src/components/default';
import { useTheme } from '@src/hooks/useTheme';
import {
  TMonthRef,
  createMonthList,
  isSameMonth,
} from '@src/utils/transactions';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';

// ----------------------------------------------------------------------

type Props = {
  selectedMonth: Date;
  onChangeMonth: (date: Date) => void;
};

//

const { width: _screenWidth } = Dimensions.get('screen');

// ----------------------------------------------------------------------

export function MonthSelect({ selectedMonth, onChangeMonth }: Props) {
  const theme = useTheme();

  // ----------------------------------------------------------------------

  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState<number>(0);

  // ----------------------------------------------------------------------

  const [monthList] = useState<TMonthRef[]>(createMonthList());

  useEffect(() => {
    const getCurrentMonthIndex = () => {
      const monthIndex = monthList.findIndex((_period) =>
        isSameMonth(new Date(_period.refDate), selectedMonth),
      );

      if (monthIndex > 0) {
        setIndex(monthIndex);
      }
    };

    getCurrentMonthIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthList]);

  // ----------------------------------------------------------------------

  const scrollToView = () => {
    if (monthList.length === 0) return;
    if (ref.current) {
      ref.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  useEffect(() => {
    scrollToView();
    onChangeMonth(monthList[index].refDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // ----------------------------------------------------------------------

  // const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
  //   if (viewableItems.length < 1) return;
  //   if (viewableItems[0] && viewableItems[0].index) {
  //     const newIndex = viewableItems[0].index;
  //     if (newIndex) {
  //       setIndex(newIndex);
  //     }
  //   }
  // };
  // const viewabilityConfig = {
  //   minimumViewTime: 1000,
  //   itemVisiblePercentThreshold: 100,
  // };
  // const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

  // ----------------------------------------------------------------------

  return (
    <View
      style={{
        height: 54,
        paddingVertical: 6,
        position: 'relative',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <FlatList
        ref={ref}
        horizontal
        data={monthList}
        initialScrollIndex={0}
        fadingEdgeLength={200}
        onLayout={scrollToView}
        keyExtractor={(item) => (item as TMonthRef).id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: _screenWidth / 2 }}
        onScrollToIndexFailed={() => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          void wait.then(() => scrollToView());
        }}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={({ item, index: fIndex }) => {
          return (
            <View style={{ justifyContent: 'center', marginHorizontal: 2 }}>
              <Button
                style={{
                  width: 120,
                  height: '100%',
                  borderRadius: 100,
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  backgroundColor: theme.palette.background.paper,
                  ...(fIndex !== index && {
                    backgroundColor: 'transparent',
                  }),
                }}
                onPress={() => {
                  setIndex(fIndex);
                }}
              >
                {(item as TMonthRef).label}
              </Button>
            </View>
          );
        }}
      />

      <View
        style={{
          height: 54,
          width: '100%',
          position: 'absolute',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: theme.props.padding.element,
        }}
      >
        <IconButton
          size={26}
          selected
          name="chevronLeft"
          color={theme.palette.text.faded}
          onPress={() => {
            if (index === 0) return;
            setIndex(index - 1);
          }}
        />

        <IconButton
          size={26}
          selected
          name="chevronRight"
          color={theme.palette.text.faded}
          onPress={() => {
            if (index === monthList.length - 1) return;
            setIndex(index + 1);
          }}
        />
      </View>
    </View>
  );
}
