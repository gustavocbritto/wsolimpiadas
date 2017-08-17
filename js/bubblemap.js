	$(function() {
			try
			{
			             
				/*var varrr;
				$.getJSON("resultado.json", function(varrr) {
					//console.log(JSON.stringify(varrr)); // show the JSON file content into console
					console.log(varrr.results.bindings.length);

				});*/

				var xobj = new XMLHttpRequest();
				xobj.overrideMimeType("application/json");
				xobj.open("GET", "resultado.json", false); // Replace 'my_data' with the path to your file
				xobj.send(null);
				var varrr = JSON.parse(xobj.responseText);

				
				
				/*var request = new XMLHttpRequest();
				request.open("GET", "resultado.json", false);
				request.send(null)
				var varrr = JSON.parse(request.responseText);*/
   
				var bubbleJSON = new Object();
				var valorTotal = 0;
				for(var i = 0; i < varrr.results.bindings.length; i++)
				{
					valorTotal =  valorTotal + parseFloat(varrr.results.bindings[i][varrr.head.vars[varrr.head.vars.length-1]].value);
				}
				
				bubbleJSON = {"label":"Total", "amount":valorTotal, "shortLabel": "", "children":[]};

				for(var i = 0; i < varrr.results.bindings.length; i++)
				{	
					var achou = false;
					for(var j = 0; j < bubbleJSON.children.length; j++)
					{
						if(bubbleJSON.children[j].label === varrr.results.bindings[i][varrr.head.vars[0]].value)
						{
						
							achou = true;
							bubbleJSON.children[j].amount = bubbleJSON.children[j].amount + parseFloat(varrr.results.bindings[i][varrr.head.vars[varrr.head.vars.length-1]].value)
							var bubbleJSONAUX = bubbleJSON.children[j];
							
							for(var k = 1; k <  varrr.head.vars.length-1; k++)
							{
								if(bubbleJSONAUX.length > 0)
								{
									for(var z = 0; z <  bubbleJSONAUX.length; z++)
									{		
										if(bubbleJSONAUX[z].label === varrr.results.bindings[i][varrr.head.vars[k-1]].value)
										{
											bubbleJSONAUX = getChildren(bubbleJSONAUX[z]);
										}	
									}

								}
								else
								{
									bubbleJSONAUX = getChildren(bubbleJSONAUX);
								}

								var achou2 = false;
								for(var z = 0; z <  bubbleJSONAUX.length; z++)
								{		

									if(bubbleJSONAUX[z].label === varrr.results.bindings[i][varrr.head.vars[k]].value)
									{
										achou2 = true;
										bubbleJSONAUX[z].amount = bubbleJSONAUX[z].amount + parseFloat(varrr.results.bindings[i][varrr.head.vars[varrr.head.vars.length-1]].value)
									}	
								}
								
								if(achou2 === false)
								{			
									bubbleJSONAUX.push({"label": varrr.results.bindings[i][varrr.head.vars[k]].value, "amount":parseFloat(varrr.results.bindings[i][varrr.head.vars[varrr.head.vars.length-1]].value), "shortLabel": "", "children":[]});
									//k--;
								}
							}
						}
					}
					if(achou === false)
					{
						bubbleJSON.children.push({"label": varrr.results.bindings[i].tipo.value, "amount":parseFloat(varrr.results.bindings[i][varrr.head.vars[varrr.head.vars.length-1]].value), "shortLabel": "", "children":[]});
						i--;
					}
				}
				//document.getElementById('demo').innerHTML = document.getElementById('demo').innerHTML + JSON.stringify(bubbleJSON);
			}
			catch(execao)
			{

			}
			
			function getChildren(node)
			{
				return node.children;
			}

		/*	var $tooltip = $('<div class="tooltip">Tooltip</div>');
			$('.bubbletree').append($tooltip);
			$tooltip.hide();
	
			var tooltip = function(event) {
				if (event.type == 'SHOW') {
					// show tooltip
					vis4.log(event);
					$tooltip.css({
						left: event.mousePos.x + 4,
						top: event.mousePos.y + 4
					});
					$tooltip.html(event.node.label+' <b>'+event.node.famount+'</b>');
					var bubble = event.target;

					$tooltip.show();
				} else {
					// hide tooltip
					$tooltip.hide();
				}
			};*/
				
			var $tooltip = $('<div class="tooltip">Tooltip</div>');
			$('.bubbletree').append($tooltip);
			//$tooltip.hide();


			new BubbleTree({
				data: bubbleJSON,
				container: '.bubbletree',
				bubbleType: 'icon',
				rootPath: '../../',
				sortBy: 'label',
				//initTooltip: initTooltip,
				autoColors: true,
				tooltip: {
							qtip: true,
							delay: 800,
							content: function(node) {
								return [node.label, '<div class="desc">'+'</div><div class="amount">R$ '+node.famount+'</div>'];
							}
						}

				
			});
		});