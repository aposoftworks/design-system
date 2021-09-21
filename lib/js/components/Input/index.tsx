// Component
import { inputCss } from "./style"
import Props from "./props"

// Hooks
import useField from "../../hooks/useField"

// Utils
import { wrapUtils } from "../../utils/form"

export default function Input(props: Props) {
	// -------------------------------------------------
	// Properties
	// -------------------------------------------------

	// hooks
	const [value, setValue] = useField(props)

	// -------------------------------------------------
	// Render
	// -------------------------------------------------

	return wrapUtils(props)(
		<input
			value={value}
			onChange={setValue}
			name={props.name}
			class={inputCss(props)}
			placeholder={props.placeholder}
		/>,
	)
}