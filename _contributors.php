<section class="contributors">
	<a href="https://github.com/davemart-in/designschool/edit/main<?php echo $_SERVER['REQUEST_URI']; ?>index.php" target="_blank" class="btn edit" rel="noopener">Edit</a>
	<div class="people">
		Contributors
		<?php foreach ($contributors as &$contributor) { ?>
    	<a href="https://github.com/<?php echo $contributor; ?>/" class="person" title="<?php echo $contributor; ?>" rel="noopener"><img src="/img/contributors/<?php echo $contributor; ?>.jpg" alt="contributor avatar"></a>
    	<?php } ?>
		<br />
		<em>View <a href="https://github.com/davemart-in/designschool/commits/main<?php echo $_SERVER['REQUEST_URI']; ?>index.php" target="_blank" rel="noopener">commit history</a><em>
	</div>
</section>