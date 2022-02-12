<?

// view resilt statisctics

$data_statistics = get_post_meta($get_ID, 'game_data_admin');
$data_statistics = $data_statistics[0];
?>
<? if ($data_statistics): ?>
	<?
	$data_statistics = array_reverse($data_statistics);
	  ?>
	<div class="b-game-statisctic-table">
		<div class="b-game-statisctic-table-names">
			<table>
				<tr>
					<th>
						Start time
					</th>
					<th>
						Rock position
					</th>
					<th>
						Rock size
					</th>
					<th>
						Donut jump position
					</th>
					<th>
						Game time
					</th>
					<th>
						Goal
					</th>
				</tr>
			</table>
		</div>
		<div class="b-game-statisctic-table-data">
			<div class="b-game-statisctic-table-data-scroll">
				<table>
					<? foreach ($data_statistics as $item_s): ?>
						<tr>
							<td>
								<?= $item_s['date']; ?>
							</td>
							<td>
								<?= $item_s['rock_p']; ?>px
							</td>
							<td>
								<?= $item_s['rock_s']; ?>x<?= $item_s['rock_s']; ?>px
							</td>
							<td>
								<? if ($item_s['jump_p']): ?>
									<?
									$count_jump = count($item_s['jump_p']);
									$loop_jump  = 1;
									?>
									<? foreach ($item_s['jump_p'] as $item_jump): ?>
										<? if ($loop_jump == $count_jump): ?>
											<?= $item_jump ?>px
										<? else: ?>
											<?= $item_jump ?>px,&nbsp;
										<? endif ?>
										<?
										$loop_jump++;
										?>
									<? endforeach ?>
								<? else: ?>
								none
								<? endif ?>
							</td>
							<td>
								<?= $item_s['time']; ?> ms
							</td>
							<td>
								<? if ($item_s['goal'] == 'Success'): ?>
									<span class="text-green">
										Success
									</span>
								<? else: ?>
									<span class="text-red">
										Fail
									</span>
								<? endif ?>
							</td>
						</tr>
					<? endforeach ?>
				</table>
			</div>
		</div>
	</div>
<? else: ?>
	<div class="b-game-statisctic-none">
		No data. Please, start game.
	</div>
<? endif ?>


