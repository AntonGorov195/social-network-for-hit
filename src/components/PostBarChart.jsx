import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PostsBarChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const width = 500;
        const height = 300;
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height + 50); // extra space for labels

        svg.selectAll('*').remove();

        let maxValue = 1;
        if (data && data.length > 0) {
            const computedMax = d3.max(data, d => d?.postCount ?? 0);
            maxValue = computedMax > 0 ? computedMax * 1.1 : 1;
        }

        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, width])
            .padding(0.4);

        const y = d3.scaleLinear()
            .domain([0,maxValue])
            .range([height, 0]);

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .call(d3.axisLeft(y));

        svg.selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.name))
            .attr('y', d => y(d.postCount))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d.postCount))
            .attr('fill', 'steelblue');

        // Add bar labels
        svg.selectAll('.label')
            .data(data)
            .join('text')
            .attr('x', d => x(d.name) + x.bandwidth() / 2)
            .attr('y', d => y(d.postCount) - 5)
            .attr('text-anchor', 'middle')
            .text(d => d.postCount)
            .style('fill', 'black')
            .style('font-size', '12px');

        // X-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + 40)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .text("Group Name");

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -40)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .text("Number of Posts");
    }, [data]);


    return <svg ref={svgRef}></svg>;
};

export default PostsBarChart;
