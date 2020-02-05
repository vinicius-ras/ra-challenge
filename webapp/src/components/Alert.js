import React from "react";

const AlertType = {
	INFO: "info",
	SUCCESS: "success",
	WARNING: "warning",
	ERROR: "error",
};

export { AlertType };

export default function Alert({className="", message, type, visible = true}) {
	if (!visible)
		return <div />;

	return (
		<div className={`component-alert component-alert-${type} ${className}`}>
			{message}
		</div>
	)
}