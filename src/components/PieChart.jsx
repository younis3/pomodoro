import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";

const PieChart = ({ data }) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 85, bottom: 40, left: 85 }}
      innerRadius={0.3}
      padAngle={1.1}
      cornerRadius={21}
      activeOuterRadiusOffset={8}
      //   colors={{ scheme: "blues" }}
      colors={{ datum: "data.color" }}
      borderWidth={1}
      //   borderColor={{
      //     from: "color",
      //     modifiers: [["darker", 0.2]],
      //   }}
      borderColor="#16151538"
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#e7dedb9b"
      arcLinkLabelsThickness={3}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 16]],
      }}
      theme={{
        tooltip: {
          container: {
            background: "#252525",
          },
        },
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",

          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 8,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "study",
          },
          id: "dots",
        },
        {
          match: {
            id: "work",
          },
          id: "dots",
        },
        {
          match: {
            id: "meditation",
          },
          id: "dots",
        },
        {
          match: {
            id: "reading",
          },
          id: "lines",
        },
        {
          match: {
            id: "writing",
          },
          id: "lines",
        },
      ]}
      //   legends={[
      //     {
      //       anchor: "bottom",
      //       direction: "row",
      //       justify: false,
      //       translateX: 0,
      //       translateY: 59,
      //       itemsSpacing: 14,
      //       itemWidth: 60,
      //       itemHeight: 16,
      //       itemTextColor: "#999999",
      //       itemDirection: "left-to-right",
      //       itemOpacity: 1,
      //       symbolSize: 16,
      //       symbolShape: "circle",
      //       effects: [
      //         {
      //           on: "hover",
      //           style: {
      //             itemTextColor: "#f9f6f6",
      //           },
      //         },
      //       ],
      //     },
      //   ]}
    />
  );
};

export default PieChart;
