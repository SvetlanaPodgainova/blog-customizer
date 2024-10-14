import clsx from 'clsx';
import styles from '../../styles/index.module.scss';
import { CSSProperties, useState } from 'react';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const articleStateSubmit = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	const articleStateReset = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleStateSubmit={articleStateSubmit}
				articleStateReset={articleStateReset}
			/>
			<Article />
		</main>
	);
};
