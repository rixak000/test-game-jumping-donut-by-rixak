<?

// WP ajax actions

add_action('wp_ajax_js_action_update', 'update_table_callback');
add_action('wp_ajax_nopriv_js_action_update', 'update_table_callback');


function update_table_callback()
{
	$get_ajax_data = $_POST['data_set'];
	$get_ID        = intval($_POST['id_post']);
	
	if ($get_ajax_data != 'reset_data')
	{
		
		// if have data
		$dataJson = get_post_meta($get_ID, 'game_data_admin');
		
		if ($dataJson[0])
		{
			$dataJson = $dataJson[0];
			array_push($dataJson, $get_ajax_data);
			update_post_meta($get_ID, 'game_data_admin', $dataJson);
			$dataJsonNew[] = $get_ajax_data;
			
		}
		else
		{
			$dataJsonNew[] = $get_ajax_data;
			update_post_meta($get_ID, 'game_data_admin', $dataJsonNew);
		}
		
	}
	else
	{
		// if reset data
		update_post_meta($get_ID, 'game_data_admin', '');
	}
	
	// view resilt statisctics
	require plugin_dir_path(__FILE__) . '/statistics.php';
	wp_die();
	
}
