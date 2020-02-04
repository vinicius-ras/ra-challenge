package br.com.viniciusras.rachallenge.maps.utilities;

import java.text.Normalizer;
import java.text.Normalizer.Form;

/** Provides utility methods for the string instances. */
public class StringUtilities {
	/** Normalizes the string, preparing it to query texts from the database.
	 * @param target The string to be normalized.
	 * @return Returns a string which has been normalized (according to Unicode Normalization Form D) and
	 * stripped off of any non-space and non-alphanumeric characters. */
	public static String normalizeStringForQuery(String target) {
		return Normalizer.normalize(target, Form.NFD).replaceAll("[^a-zA-Z0-9\\s]", "").toUpperCase();
	}
}