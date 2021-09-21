// Packages
import { Grid, Input, Text, Form, Toggle, Select, Title, Theme } from "@lib"
import { createElement } from "preact"
import { useEffect, useMemo, useState } from "preact/hooks"

// Component
import PropsInterface from "./props"

export default function Playground(props: PropsInterface) {
	// -------------------------------------------------
	// Properties
	// -------------------------------------------------

	// state
	const [componentProps, setComponentProps] = useState(props.defaultProps || {})

	// -------------------------------------------------
	// Effects
	// -------------------------------------------------

	useEffect(() => {
		if (props.defaultProps) setComponentProps(props.defaultProps)
	}, [props.defaultProps])

	// -------------------------------------------------
	// Memos
	// -------------------------------------------------

	const controls = useMemo(() => {
		const sorted = Object.keys(props.props).sort((a, b) => !props.props[a].group ? -1 : props.props[a].group === props.props[b].group ? 0 : 1)
		let lastGroup: string | undefined

		return sorted
			.map(key => {
				const prop = props.props[key]

				// select field
				if (prop.type === "select") {
					return [<Select tooltip={prop.description} label={key} name={key} options={prop.options} />, prop] as const
				}

				// toggle field
				if (prop.type === "boolean") {
					return [<Toggle tooltip={prop.description} label={key} name={key} />, prop] as const
				}

				return [<Input tooltip={prop.description} label={key} name={key} />, prop] as const
			})
			// wrap controller with structure
			.map(controller => {
				const group = lastGroup !== controller[1].group ? controller[1].group : null
				lastGroup = controller[1].group

				return (
					<>
						{group && <Title size="4">{group}</Title>}
						{controller[0]}
						{props.minimal !== true && <Text p="b-2" size="sm">{controller[1].description}</Text>}
					</>
				)
			})
	}, [props.props])

	// -------------------------------------------------
	// Render
	// -------------------------------------------------

	return (
		<Grid direction="row" fill>
			<Grid col="6" css={{ height: 300, overflow: "auto" }}>
				<Form data={[componentProps, setComponentProps]}>
					{controls}
				</Form>
			</Grid>
			<Grid col="6" vertical="fill">
				<Grid fill horizontal="center" vertical="center" css={{ overflow: "hidden" }}>
					<div>
						{createElement(props.component, componentProps)}
					</div>
				</Grid>
			</Grid>
		</Grid>
	)
}